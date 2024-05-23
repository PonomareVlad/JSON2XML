import { toXML } from 'to-xml'

export const config = { runtime: 'edge' }

const sanitizeURL = url => (url.startsWith('http') ? url : `http://${url}`)

export const GET = async req => {
  const { pathname } = new URL(req.url)
  const url = new URL(sanitizeURL(pathname))
  console.debug(url.href)
  const response = await fetch(url)
  const data = await response.json()
  console.debug(data)
  return new Response(toXML(data))
}
