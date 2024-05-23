import { toXML } from 'to-xml'

export const config = { runtime: 'edge' }

const sanitizeURL = url => (url.startsWith('http') ? url : `http://${url}`)

export default async req => {
  const { pathname } = new URL(req.url)
  const response = await fetch(sanitizeURL(pathname.slice(1)))
  return new Response(toXML(await response.json()))
}
