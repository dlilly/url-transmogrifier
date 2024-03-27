import type { NextApiRequest, NextApiResponse } from 'next'
import URLManager from '@/lib/url-manager'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const host = req.headers.host
  const proto = req.headers['x-forwarded-proto']
  let url = req.query.url
  
  url = Array.isArray(url) ? url[0] : url

  if (!url) {
    return res.status(400).json({ message: `no url provided to transmogrify!` })
  }

  // TODO: add more validation e.g. RegExp match
  // new RegExp(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/)
  try {
    const foo = new URL(url)    
  } catch (error) {
    return res.status(400).json(error)
  }

  const transmogrified = URLManager.transmogrify(url, undefined)
  res.status(200).json({
    proto,
    host,
    transmogrified
  })
}