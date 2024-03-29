import { NextApiRequest, NextApiResponse } from "next"
const timeout: number = 30000
let requestCount: number = 0

// EXTRA CREDIT: add rate limiting
const RateLimiter = {
    limit: (req: NextApiRequest, res: NextApiResponse) => {
        if (requestCount > 5) {
            res.setHeader('Retry-After', timeout / 1000)
            return res.status(429).json({ error: `too many requests. try again in ${timeout / 1000} seconds` })
        }
        else {
            requestCount++
            setTimeout(() => { requestCount-- }, timeout)
        }
    }
}

export default RateLimiter