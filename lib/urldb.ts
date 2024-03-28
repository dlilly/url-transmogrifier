import { join } from 'path'
import fs from 'fs-extra'
import { URLEntry } from './url-manager'
import { generate } from 'random-words'

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
const lookupByURL = (url: URL): URLEntry | undefined => {
    return Object.values(urlEntries).find(x => x.url === url)
}

export type SlugType = "short" | "pronounceable"

const generateSlug = (pronounceable: boolean) => pronounceable ? generate({ exactly: 3, join: '-' }) : Math.random().toString(20).substring(2, 8)

// REQUIREMENT: ensure the slug of the URL is unique
const getUniqueSlug = (pronounceable: boolean): string => {
    let slug = generateSlug(pronounceable)
    while (Object.keys(urlEntries).includes(slug)) {
        slug = generateSlug(pronounceable)
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

const URLDB = {
    lookupByURL,
    lookup,
    saveEntry,
    getUniqueSlug
}

export default URLDB