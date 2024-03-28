import { URLEntry } from "@/lib/url-manager";
import Button from "@mui/material/Button";
import { Stack } from "@mui/system";
import { Component } from "react";
import { ContentCopy } from '@mui/icons-material';

export function TransmogrifiedURL(props: any) {
    if (!props.transmogrified?.transmogrified) {
        return <div></div>
    }

    const {
        proto,
        host,
        transmogrified: {
            url,
            slug
        }
    } = props.transmogrified

    // EXTRA CREDIT: make it easy to copy shortened URL to the clipboard
    const copyToClipboard = () => {
        navigator.clipboard.writeText(`${proto}://${host}/${slug}`)
    }

    return <div>
        <div className='transmogrified-success'>Success! Here&apos;s your transmogrified URL</div>
        <Stack direction='row'>
            <div>{proto}://{host}/{slug}</div>
            <Button variant="contained" onClick={copyToClipboard}><ContentCopy/> Copy</Button>
        </Stack>
    </div>
}