import { join } from 'path'
import fs from 'fs-extra'
import { URLEntry } from './url-manager'

const DB_PATH = join(process.env[process.platform == 'win32' ? 'USERPROFILE' : 'HOME'] || __dirname, '.url-transmogrifier')
const URL_FILE_PATH = `${DB_PATH}/urls.json`

// ensure the DB_PATH directory exists
fs.mkdirpSync(DB_PATH)

interface HashMap<T> {
    [key: string]: T
}

// initialize the DB from file
let urlEntries: HashMap<URLEntry> = fs.existsSync(URL_FILE_PATH) ? fs.readJSONSync(URL_FILE_PATH) : {}

const save = () => fs.writeJSONSync(URL_FILE_PATH, urlEntries)
const lookupByURL = (url: string): URLEntry | undefined => {
    return Object.values(urlEntries).find(x => x.url === url)
}

// REQUIREMENT: ensure the slug of the URL is unique
const getUniqueSlug = (): string => {
    let slug = Math.random().toString(20).substring(2, 8)
    while (Object.keys(urlEntries).includes(slug)) {
        slug = Math.random().toString(20).substring(2, 8)
    }
    return slug
}

const lookup = (slug: string): URLEntry | undefined => {
    return urlEntries[slug]
}

// REQUIREMENT: save a record of the shortened URL to the database
const saveEntry = (entry: URLEntry) => {
    urlEntries[entry.slug] = entry
    save()
}

export default {
    lookupByURL,
    lookup,
    saveEntry,
    getUniqueSlug
}