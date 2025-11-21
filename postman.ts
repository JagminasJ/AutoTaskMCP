export async function callApi(
  baseUrl: string,
  { method = 'GET', headers = {}, params = {}, body = {} } = {},
) {
  const url = new URL(baseUrl)
  if (params)
    Object.entries(params).forEach(([k, v]) => {
      if (v != null) url.searchParams.set(k, String(v))
    })
  const res = await fetch(url.toString(), {
    method,
    headers,
    body: body as any,
  })
  const text = await res.text()
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${text}`)
  const ct = res.headers.get('content-type') || ''
  return ct.includes('application/json') ? JSON.parse(text) : text
}
