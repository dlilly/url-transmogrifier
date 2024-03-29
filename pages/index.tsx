import Image from "next/image";
import { useState } from 'react'

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, Checkbox, FormControlLabel, FormGroup, TextField } from "@mui/material";
import { TransmogrifiedURL } from "@/app/components/transmogrified";

export default function Home() {
  const [url, setUrl] = useState('')
  const [data, setData] = useState({})
  const [pronounceableSlug, setPronounceableSlug] = useState(false)

  const buttonClicked = () => {
    fetch(`/api/transmogrify?url=${url}&pronounceableSlug=${pronounceableSlug}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data)
      })
  }

  const urlFieldUpdated = (evt: React.ChangeEvent<HTMLInputElement>) => {
    try {
      new URL(evt.target.value)
      setUrl(evt.target.value)
    } catch (error) {      
      setUrl('')
    }
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
            <div>URL Transmogrifier <Image src={'/transmogrifier.jpg'} alt={""} width={50} height={50} /></div>
            <TextField id="url" label="URL to transmogrify" variant="outlined" onChange={urlFieldUpdated}>{url}</TextField>

            <FormGroup>
              <FormControlLabel control={<Checkbox onChange={(evt) => { setPronounceableSlug(evt.target.checked); }} />} label="Pronounceable slug?" />
            </FormGroup>

            <Button variant="contained" onClick={buttonClicked} disabled={url === ''}>Transmogrify</Button>
            {data && <TransmogrifiedURL data={data} />}
          </Stack>
        </Typography>
      </Box>
    </Container>
  )
}