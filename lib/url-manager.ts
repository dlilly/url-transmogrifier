import db from "./urldb"

export class URLEntry {
    url: URL
    createdBy?: string

    slug: string
    timesVisited: number
    timesTransmogrified: number
    createdAt: Date

    constructor(url: URL, pronounceableSlug: boolean, createdBy?: string) {
        this.url = url
        this.createdBy = createdBy
        this.createdAt = new Date()
        this.timesVisited = 0
        this.timesTransmogrified = 0
        this.slug = db.getUniqueSlug(pronounceableSlug)
    }
}

const transmogrify = (url: URL, pronounceableSlug: boolean = false, createdBy?: string): URLEntry => {
    let transmogrified = db.lookupByURL(url)

    if (!transmogrified) {
        transmogrified = new URLEntry(url, pronounceableSlug, createdBy)
    }

    transmogrified.timesTransmogrified++
    db.saveEntry(transmogrified)

    return transmogrified
}

const URLManager = {
    transmogrify,
    lookup: db.lookup,
    save: db.saveEntry
}

export default URLManager