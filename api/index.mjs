import { toXML } from 'to-xml'

export const config = { runtime: 'edge' }

const sanitizeURL = url => (url.startsWith('http') ? url : `https://${url}`)

export default async req => {
  const { pathname, search } = new URL(req.url)
  const response = await fetch(sanitizeURL(pathname.slice(1) + search))
  return new Response(toXML({body: await response.json()}), {
    headers: { 'content-type': 'text/xml' },
  })
}
