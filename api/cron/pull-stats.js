import { supabaseAdmin } from '../_lib/supabaseAdmin.js'
import { decryptToken, encryptToken } from '../_lib/crypto.js'
import * as instagram from '../_lib/instagram.js'
import * as tiktok from '../_lib/tiktok.js'

export default async function handler(req, res) {
  // Verify cron secret (Vercel sends this automatically for cron jobs)
  const authHeader = req.headers.authorization
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const results = { success: 0, failed: 0, refreshed: 0, errors: [] }
  const today = new Date().toISOString().split('T')[0]

  try {
    // Get all connected accounts
    const { data: accounts, error } = await supabaseAdmin
      .from('connected_accounts')
      .select('*')

    if (error) throw error

    for (const account of accounts) {
      try {
        const accessToken = decryptToken(account.access_token_encrypted)

        if (account.platform === 'instagram') {
          // Check if token needs refresh (within 10 days of expiry)
          const expiresAt = new Date(account.token_expires_at)
          const daysUntilExpiry = (expiresAt - Date.now()) / (1000 * 60 * 60 * 24)
          if (daysUntilExpiry < 10) {
            const refreshed = await instagram.refreshLongLivedToken(accessToken)
            const newExpiry = new Date(Date.now() + refreshed.expiresIn * 1000).toISOString()
            await supabaseAdmin.from('connected_accounts').update({
              access_token_encrypted: encryptToken(refreshed.accessToken),
              token_expires_at: newExpiry,
            }).eq('id', account.id)
            results.refreshed++
          }

          // Pull profile stats
          const profile = await instagram.fetchProfile(accessToken)
          await supabaseAdmin.from('daily_snapshots').upsert({
            user_id: account.user_id,
            platform: 'instagram',
            snapshot_date: today,
            followers: profile.followers_count,
            following: profile.follows_count,
            total_posts: profile.media_count,
            raw_response: profile,
          }, { onConflict: 'user_id,platform,snapshot_date' })

          // Pull recent media
          const media = await instagram.fetchMedia(accessToken, 10)
          for (const post of media) {
            await supabaseAdmin.from('posts').upsert({
              user_id: account.user_id,
              platform: 'instagram',
              platform_post_id: post.id,
              post_type: post.media_type?.toLowerCase(),
              caption: post.caption?.slice(0, 500),
              permalink: post.permalink,
              thumbnail_url: post.thumbnail_url || post.media_url,
              published_at: post.timestamp,
              likes: post.like_count || 0,
              comments: post.comments_count || 0,
              raw_response: post,
              updated_at: new Date().toISOString(),
            }, { onConflict: 'platform,platform_post_id' })
          }

        } else if (account.platform === 'tiktok') {
          // TikTok tokens expire daily — always refresh
          if (account.refresh_token_encrypted) {
            const refreshToken = decryptToken(account.refresh_token_encrypted)
            const refreshed = await tiktok.refreshAccessToken(refreshToken)
            const newExpiry = new Date(Date.now() + refreshed.expiresIn * 1000).toISOString()
            await supabaseAdmin.from('connected_accounts').update({
              access_token_encrypted: encryptToken(refreshed.accessToken),
              refresh_token_encrypted: refreshed.refreshToken ? encryptToken(refreshed.refreshToken) : account.refresh_token_encrypted,
              token_expires_at: newExpiry,
            }).eq('id', account.id)
            results.refreshed++
          }

          // Pull profile
          const freshToken = decryptToken(
            (await supabaseAdmin.from('connected_accounts').select('access_token_encrypted').eq('id', account.id).single()).data.access_token_encrypted
          )
          const profile = await tiktok.fetchProfile(freshToken)
          await supabaseAdmin.from('daily_snapshots').upsert({
            user_id: account.user_id,
            platform: 'tiktok',
            snapshot_date: today,
            followers: profile.follower_count,
            following: profile.following_count,
            total_likes: profile.likes_count,
            total_posts: profile.video_count,
            raw_response: profile,
          }, { onConflict: 'user_id,platform,snapshot_date' })

          // Pull recent videos
          const videos = await tiktok.fetchVideos(freshToken, 10)
          for (const video of videos) {
            await supabaseAdmin.from('posts').upsert({
              user_id: account.user_id,
              platform: 'tiktok',
              platform_post_id: video.id,
              post_type: 'video',
              caption: video.title || video.video_description,
              permalink: video.share_url,
              thumbnail_url: video.cover_image_url,
              published_at: new Date(video.create_time * 1000).toISOString(),
              views: video.view_count || 0,
              likes: video.like_count || 0,
              comments: video.comment_count || 0,
              shares: video.share_count || 0,
              raw_response: video,
              updated_at: new Date().toISOString(),
            }, { onConflict: 'platform,platform_post_id' })
          }
        }

        results.success++
      } catch (err) {
        results.failed++
        results.errors.push({ account_id: account.id, platform: account.platform, error: err.message })
      }
    }

    return res.json({ ok: true, ...results })
  } catch (err) {
    console.error('Cron error:', err)
    return res.status(500).json({ error: err.message })
  }
}
