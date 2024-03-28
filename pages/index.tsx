import Image from "next/image";
import { useState } from 'react'

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, Checkbox, FormControlLabel, FormGroup, Radio, RadioGroup, TextField } from "@mui/material";
import { TransmogrifiedURL } from "@/app/components/transmogrified";

export default function Home() {
  const [url, setUrl] = useState('')
  const [data, setData] = useState({})
  const [validateLive, setValidateLive] = useState(true)
  const [pronounceableSlug, setPronounceableSlug] = useState(false)

  const buttonClicked = () => {
    console.log(`/api/transmogrify?url=${url}&validateLive=${validateLive}&pronounceableSlug=${pronounceableSlug}`)
    fetch(`/api/transmogrify?url=${url}&validateLive=${validateLive}&pronounceableSlug=${pronounceableSlug}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data)
      })
  }

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
        <Typography variant="body1" component="h1" sx={{ mb: 2 }}>
          <Stack>
            <Stack direction="row">
              
            </Stack>
            <div>URL Transmogrifier <Image src={'/transmogrifier.jpg'} alt={""} width={50} height={50} /></div>
            <div>Enter a URL to Transmogrify</div>
            <TextField id="url" label="URL" variant="outlined" onChange={(evt) => { setUrl(evt.target.value); }}>{url}</TextField>

            <FormGroup>
              <FormControlLabel control={<Checkbox defaultChecked onChange={(evt) => { setValidateLive(evt.target.checked); }} />} label="Validate URL is live?" />
              <FormControlLabel control={<Checkbox onChange={(evt) => { setPronounceableSlug(evt.target.checked); }} />} label="Pronounceable slug?" />
            </FormGroup>

            <Button variant="contained" onClick={buttonClicked}>Transmogrify</Button>
            {data && <TransmogrifiedURL transmogrified={data} />}
          </Stack>
        </Typography>
      </Box>
    </Container>
  )
}