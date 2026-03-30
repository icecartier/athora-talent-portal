export default function handler(req, res) {
  const redirectUri = `${req.headers['x-forwarded-proto'] || 'https'}://${req.headers.host}/api/auth/tiktok/callback`

  const params = new URLSearchParams({
    client_key: process.env.TIKTOK_CLIENT_KEY,
    redirect_uri: redirectUri,
    scope: 'user.info.basic,user.info.stats,video.list',
    response_type: 'code',
    state: req.query.state || 'auth',
  })

  res.redirect(`https://www.tiktok.com/v2/auth/authorize/?${params}`)
}
