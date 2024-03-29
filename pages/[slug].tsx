import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { URLEntry } from '@/lib/url-manager';

import { getOrdinal } from '@/lib/util';

export default function RedirectPage() {
  const [data, setData] = useState<URLEntry | undefined>()
  const [isLoading, setLoading] = useState(true)

  const router = useRouter()
  console.log(router.query.slug)

  useEffect(() => {
    if (!router.isReady) return;
    fetch(`/api/visit?slug=${router.query.slug}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)

        if (data.url) {
          setTimeout(() => {
            router.push(data.url)
          }, 1500)
        }
      })
  }, [router, router.query])

  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No data</p>

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {
          data.url && <Typography variant="h4" component="h1" sx={{ mb: 2, alignItems: 'center' }}>
            <h4>Redirecting you to</h4>
            <br />
            <h1>{data.url.toString()}</h1>
            <br />
            <h4>This is the {getOrdinal(data['timesVisited'])} time this URL has been visited!</h4>
          </Typography>
        }
        {
          !data.url && <Typography variant="h4" component="h1" sx={{ mb: 2, alignItems: 'center' }}>
            <h4>Couldn't find URL for slug {router.query.slug}!</h4>
          </Typography>
        }
      </Box>
    </Container>
  )
}