export async function callApi(
  baseUrl: string,
  { method = 'GET', headers = {}, params = {}, body = {} } = {},
) {
  const url = new URL(baseUrl)
  if (params)
    Object.entries(params).forEach(([k, v]) => {
      if (v != null) url.searchParams.set(k, String(v))
    })
  
  // Only include body for methods that support it (not GET, HEAD, OPTIONS)
  const fetchOptions: RequestInit = {
    method,
    headers,
  }
  
  // Only add body for methods that support it
  if (method !== 'GET' && method !== 'HEAD' && method !== 'OPTIONS' && body) {
    fetchOptions.body = body as any
  }
  
  const res = await fetch(url.toString(), fetchOptions)
  const text = await res.text()
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${text}`)
  const ct = res.headers.get('content-type') || ''
  return ct.includes('application/json') ? JSON.parse(text) : text
}
