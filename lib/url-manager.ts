import db from "./urldb"

export class URLEntry {
    url: string
    createdBy?: string

    slug: string
    timesVisited: number
    timesTransmogrified: number
    createdAt: Date

    constructor(url: string, createdBy?: string) {
        this.url = url
        this.createdBy = createdBy
        this.createdAt = new Date()
        this.timesVisited = 0
        this.timesTransmogrified = 0
        this.slug = db.getUniqueSlug()
    }
}

const transmogrify = (url: string, createdBy?: string): URLEntry => {
    let transmogrified = db.lookupByURL(url)

    if (!transmogrified) {
        transmogrified = new URLEntry(url, createdBy)
    }

    transmogrified.timesTransmogrified++
    db.saveEntry(transmogrified)

    return transmogrified
}

export default {
    transmogrify,
    lookup: db.lookup,
    save: db.saveEntry
}