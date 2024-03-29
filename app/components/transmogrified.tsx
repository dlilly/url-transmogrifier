import { URLEntry } from "@/lib/url-manager";
import Button from "@mui/material/Button";
import { Stack } from "@mui/system";
import { Component } from "react";
import { ContentCopy } from '@mui/icons-material';
import { Alert } from "@mui/material";

export function TransmogrifiedURL(props: any) {
    console.log(props)

    if (!props.data?.transmogrified) {
        return <div></div>
    }

    const {
        proto,
        host,
        transmogrified: {
            url,
            slug
        }
    } = props.data

    // EXTRA CREDIT: make it easy to copy shortened URL to the clipboard
    const copyToClipboard = () => navigator.clipboard.writeText(`${proto}://${host}/${slug}`)

    return <div>
        <Alert severity="success">
            <Stack>
                <div className='transmogrified-success'>Success! Here&apos;s your transmogrified URL</div>
                <div>{proto}://{host}/{slug}</div>
                <br/>
                <Button variant="contained" onClick={copyToClipboard}><ContentCopy /> Copy</Button>
            </Stack>
        </Alert>
    </div>
}