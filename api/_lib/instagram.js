const API_VERSION = 'v21.0'
const GRAPH_URL = `https://graph.instagram.com/${API_VERSION}`

export async function exchangeCodeForToken(code, redirectUri) {
  // Step 1: Exchange code for short-lived token
  const params = new URLSearchParams({
    client_id: process.env.INSTAGRAM_CLIENT_ID,
    client_secret: process.env.INSTAGRAM_CLIENT_SECRET,
    grant_type: 'authorization_code',
    redirect_uri: redirectUri,
    code,
  })

  const shortRes = await fetch('https://api.instagram.com/oauth/access_token', {
    method: 'POST',
    body: params,
  })
  const shortData = await shortRes.json()
  if (shortData.error_message) throw new Error(shortData.error_message)

  // Step 2: Exchange for long-lived token (60 days)
  const longRes = await fetch(
    `${GRAPH_URL}/access_token?grant_type=ig_exchange_token&client_secret=${process.env.INSTAGRAM_CLIENT_SECRET}&access_token=${shortData.access_token}`
  )
  const longData = await longRes.json()
  if (longData.error) throw new Error(longData.error.message)

  return {
    accessToken: longData.access_token,
    expiresIn: longData.expires_in, // seconds (~5184000 = 60 days)
    userId: shortData.user_id,
  }
}

export async function fetchProfile(accessToken) {
  const res = await fetch(
    `${GRAPH_URL}/me?fields=user_id,username,name,profile_picture_url,followers_count,follows_count,media_count&access_token=${accessToken}`
  )
  const data = await res.json()
  if (data.error) throw new Error(data.error.message)
  return data
}

export async function fetchMedia(accessToken, limit = 25) {
  const res = await fetch(
    `${GRAPH_URL}/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,like_count,comments_count&limit=${limit}&access_token=${accessToken}`
  )
  const data = await res.json()
  if (data.error) throw new Error(data.error.message)
  return data.data || []
}

export async function fetchMediaInsights(accessToken, mediaId) {
  const res = await fetch(
    `${GRAPH_URL}/${mediaId}/insights?metric=impressions,reach,saved,shares&access_token=${accessToken}`
  )
  const data = await res.json()
  if (data.error) return null // Some media types don't support insights
  return data.data || []
}

export async function refreshLongLivedToken(accessToken) {
  const res = await fetch(
    `${GRAPH_URL}/refresh_access_token?grant_type=ig_refresh_token&access_token=${accessToken}`
  )
  const data = await res.json()
  if (data.error) throw new Error(data.error.message)
  return {
    accessToken: data.access_token,
    expiresIn: data.expires_in,
  }
}
