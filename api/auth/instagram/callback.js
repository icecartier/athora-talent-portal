import { supabaseAdmin } from '../../_lib/supabaseAdmin.js'
import { encryptToken } from '../../_lib/crypto.js'
import { exchangeCodeForToken, fetchProfile } from '../../_lib/instagram.js'

export default async function handler(req, res) {
  try {
    const { code, state } = req.query

    if (!code) {
      return res.redirect('/?error=instagram_no_code')
    }

    const redirectUri = `${req.headers['x-forwarded-proto'] || 'https'}://${req.headers.host}/api/auth/instagram/callback`

    // Exchange code for long-lived token
    const tokenData = await exchangeCodeForToken(code, redirectUri)

    // Fetch their profile
    const profile = await fetchProfile(tokenData.accessToken)

    // Get the Supabase user from the state (JWT)
    // In production, state should contain the user's access token
    const authHeader = req.cookies?.['sb-access-token'] || state
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(authHeader)

    if (authError || !user) {
      return res.redirect('/login?error=session_expired')
    }

    // Encrypt the token before storing
    const encryptedToken = encryptToken(tokenData.accessToken)

    // Store the connected account
    const expiresAt = new Date(Date.now() + tokenData.expiresIn * 1000).toISOString()

    await supabaseAdmin.from('connected_accounts').upsert({
      user_id: user.id,
      platform: 'instagram',
      platform_user_id: String(tokenData.userId),
      platform_username: profile.username || profile.name,
      access_token_encrypted: encryptedToken,
      token_expires_at: expiresAt,
      scopes: ['instagram_business_basic', 'instagram_business_manage_insights'],
      connected_at: new Date().toISOString(),
    }, { onConflict: 'user_id,platform' })

    // Pull initial snapshot
    const { followers_count, follows_count, media_count } = profile
    await supabaseAdmin.from('daily_snapshots').upsert({
      user_id: user.id,
      platform: 'instagram',
      snapshot_date: new Date().toISOString().split('T')[0],
      followers: followers_count,
      following: follows_count,
      total_posts: media_count,
      raw_response: profile,
    }, { onConflict: 'user_id,platform,snapshot_date' })

    res.redirect('/profile?connected=instagram')
  } catch (err) {
    console.error('Instagram callback error:', err)
    res.redirect(`/profile?error=instagram_failed&message=${encodeURIComponent(err.message)}`)
  }
}
