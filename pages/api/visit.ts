import RateLimiter from '@/lib/rate-limiter'
import { getFirstQueryValue } from '@/lib/util'
import type { NextApiRequest, NextApiResponse } from 'next'
import URLManager from '../../lib/url-manager'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    RateLimiter.limit(req, res)

    const slug = getFirstQueryValue(req.query.slug)
    if (!slug) {
        return res.status(400).json({ message: `no slug provided to transmogrify!` })
    }

    const entry = URLManager.lookup(slug)

    if (!entry) {
        return res.status(404).json({ message: `no url matching slug ${slug}` })
    }

    // update the entry's visited count
    entry.timesVisited++
    URLManager.save(entry)

    res.status(200).json(entry)
}