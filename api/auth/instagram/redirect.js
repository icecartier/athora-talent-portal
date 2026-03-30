export default function handler(req, res) {
  const redirectUri = `${req.headers['x-forwarded-proto'] || 'https'}://${req.headers.host}/api/auth/instagram/callback`

  const params = new URLSearchParams({
    client_id: process.env.INSTAGRAM_CLIENT_ID,
    redirect_uri: redirectUri,
    scope: 'instagram_business_basic,instagram_business_manage_insights',
    response_type: 'code',
    state: req.query.state || 'auth', // pass user session token as state in production
  })

  res.redirect(`https://www.instagram.com/oauth/authorize?${params}`)
}
