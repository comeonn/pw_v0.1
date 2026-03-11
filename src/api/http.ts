export class HttpError extends Error {
  status: number
  bodyText?: string

  constructor(message: string, status: number, bodyText?: string) {
    super(message)
    this.name = 'HttpError'
    this.status = status
    this.bodyText = bodyText
  }
}

export async function postJson<TResp>(
  url: string,
  body: unknown,
  init?: Omit<RequestInit, 'method' | 'body'>
): Promise<TResp> {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      ...(init?.headers || {})
    },
    body: JSON.stringify(body),
    ...init
  })

  if (!res.ok) {
    const txt = await res.text().catch(() => '')
    throw new HttpError(`请求失败：${res.status}`, res.status, txt)
  }

  return (await res.json()) as TResp
}

export async function getJson<TResp>(
  url: string,
  init?: Omit<RequestInit, 'method'>
): Promise<TResp> {
  const res = await fetch(url, { method: 'GET', ...init })
  if (!res.ok) {
    const txt = await res.text().catch(() => '')
    throw new HttpError(`请求失败：${res.status}`, res.status, txt)
  }
  return (await res.json()) as TResp
}

