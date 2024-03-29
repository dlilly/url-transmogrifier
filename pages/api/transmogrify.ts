import type { NextApiRequest, NextApiResponse } from 'next'
import URLManager from '@/lib/url-manager'
import { getFirstQueryValue } from '@/lib/util'
import RateLimiter from '@/lib/rate-limiter'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const host = req.headers.host
  const proto = req.headers['x-forwarded-proto']
  const pronounceableSlug = req.query.pronounceableSlug === 'true'
  const userEmail = getFirstQueryValue(req.query.userEmail)
  const url = getFirstQueryValue(req.query.url)

  RateLimiter.limit(req, res)

  if (!url) {
    return res.status(400).json({ message: `no url provided to transmogrify!` })
  }

  // EXTRA CREDIT: validate the URL provided is an actual URL
  try {
    const foo = new URL(url)

    const transmogrified = URLManager.transmogrify(foo, pronounceableSlug, userEmail)
    res.status(200).json({
      proto,
      host,
      transmogrified
    })
  } catch (error) {
    return res.status(400).json(error)
  }
}