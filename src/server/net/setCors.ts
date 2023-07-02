import { Req } from '../handler/handle'

export default function setCors(req: Req) {
  if (req.method === 'OPTIONS') {
    const origin = req.headers.get('Origin')
    const responseHeaders: Record<string, string> = {
      'Access-Control-Allow-Origin': origin || '*',
      'Access-Control-Allow-Credentials': 'true',
    }
    responseHeaders['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
    responseHeaders['Access-Control-Allow-Headers'] =
      'Content-Type, Authorization, X-Requested-With, X-TLC, X-PROJECT'
    responseHeaders['Access-Control-Max-Age'] = '3600'
    return new Response(null, {
      status: 204,
      headers: responseHeaders,
    })
  }

  return false
}
