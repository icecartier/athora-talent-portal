const API_URL = 'https://open.tiktokapis.com/v2'

export async function exchangeCodeForToken(code, redirectUri) {
  const res = await fetch(`${API_URL}/oauth/token/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_key: process.env.TIKTOK_CLIENT_KEY,
      client_secret: process.env.TIKTOK_CLIENT_SECRET,
      code,
      grant_type: 'authorization_code',
      redirect_uri: redirectUri,
    }),
  })
  const data = await res.json()
  if (data.error) throw new Error(data.error_description || data.error)
  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    expiresIn: data.expires_in,
    openId: data.open_id,
    scope: data.scope,
  }
}

export async function fetchProfile(accessToken) {
  const res = await fetch(
    `${API_URL}/user/info/?fields=open_id,union_id,avatar_url,display_name,follower_count,following_count,likes_count,video_count`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  )
  const data = await res.json()
  if (data.error?.code !== 'ok' && data.error?.code) throw new Error(data.error.message)
  return data.data?.user || data.data
}

export async function fetchVideos(accessToken, maxCount = 20) {
  const res = await fetch(`${API_URL}/video/list/`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      max_count: maxCount,
      fields: 'id,title,video_description,create_time,cover_image_url,share_url,view_count,like_count,comment_count,share_count,duration',
    }),
  })
  const data = await res.json()
  if (data.error?.code !== 'ok' && data.error?.code) throw new Error(data.error.message)
  return data.data?.videos || []
}

export async function refreshAccessToken(refreshToken) {
  const res = await fetch(`${API_URL}/oauth/token/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_key: process.env.TIKTOK_CLIENT_KEY,
      client_secret: process.env.TIKTOK_CLIENT_SECRET,
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
  })
  const data = await res.json()
  if (data.error) throw new Error(data.error_description || data.error)
  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    expiresIn: data.expires_in,
  }
}
