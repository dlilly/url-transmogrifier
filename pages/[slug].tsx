import Image from "next/image";
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

import Card from '@mui/material/Card';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import CardContent from '@mui/material/CardContent';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function getOrdinal(n: number) {
  let ord = 'th';

  if (n % 10 == 1 && n % 100 != 11) {
    ord = 'st';
  }
  else if (n % 10 == 2 && n % 100 != 12) {
    ord = 'nd';
  }
  else if (n % 10 == 3 && n % 100 != 13) {
    ord = 'rd';
  }

  return `${n}${ord}`;
}

export default function RedirectPage() {
  const [data, setData] = useState(null)
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

        setTimeout(() => {
          router.push(data.url)
        }, 1500)
      })
  }, [router.query])

  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No profile data</p>

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
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          Redirecting you to: {data['url']}<br/>
          This is the {getOrdinal(data['timesVisited'])} time this URL has been visited!
        </Typography>
      </Box>
    </Container>
  )
}