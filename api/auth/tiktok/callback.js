import { supabaseAdmin } from '../../_lib/supabaseAdmin.js'
import { encryptToken } from '../../_lib/crypto.js'
import { exchangeCodeForToken, fetchProfile } from '../../_lib/tiktok.js'

export default async function handler(req, res) {
  try {
    const { code, state } = req.query

    if (!code) {
      return res.redirect('/?error=tiktok_no_code')
    }

    const redirectUri = `${req.headers['x-forwarded-proto'] || 'https'}://${req.headers.host}/api/auth/tiktok/callback`

    // Exchange code for tokens
    const tokenData = await exchangeCodeForToken(code, redirectUri)

    // Fetch their profile
    const profile = await fetchProfile(tokenData.accessToken)

    // Get the Supabase user
    const authHeader = req.cookies?.['sb-access-token'] || state
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(authHeader)

    if (authError || !user) {
      return res.redirect('/login?error=session_expired')
    }

    // Encrypt tokens
    const encryptedAccess = encryptToken(tokenData.accessToken)
    const encryptedRefresh = tokenData.refreshToken ? encryptToken(tokenData.refreshToken) : null

    const expiresAt = new Date(Date.now() + tokenData.expiresIn * 1000).toISOString()

    // Store connected account
    await supabaseAdmin.from('connected_accounts').upsert({
      user_id: user.id,
      platform: 'tiktok',
      platform_user_id: tokenData.openId,
      platform_username: profile.display_name,
      access_token_encrypted: encryptedAccess,
      refresh_token_encrypted: encryptedRefresh,
      token_expires_at: expiresAt,
      scopes: tokenData.scope?.split(',') || ['user.info.basic', 'user.info.stats', 'video.list'],
      connected_at: new Date().toISOString(),
    }, { onConflict: 'user_id,platform' })

    // Pull initial snapshot
    await supabaseAdmin.from('daily_snapshots').upsert({
      user_id: user.id,
      platform: 'tiktok',
      snapshot_date: new Date().toISOString().split('T')[0],
      followers: profile.follower_count,
      following: profile.following_count,
      total_likes: profile.likes_count,
      total_posts: profile.video_count,
      raw_response: profile,
    }, { onConflict: 'user_id,platform,snapshot_date' })

    res.redirect('/profile?connected=tiktok')
  } catch (err) {
    console.error('TikTok callback error:', err)
    res.redirect(`/profile?error=tiktok_failed&message=${encodeURIComponent(err.message)}`)
  }
}
