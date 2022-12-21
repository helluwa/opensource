import { KaipullaCore, createUpstashProvider } from '@helluwa/kaipulla-core'
import { Redis } from '@upstash/redis/with-fetch'

const encryption_key = process.env.ENCRYPTION_SECRET_KEY as string
const url = process.env.UPSTASH_REDIS_URL as string
const token = process.env.UPSTASH_REDIS_TOKEN as string

export const kaipulla = new KaipullaCore({ db: createUpstashProvider(new Redis({ url, token })), encryption_key }) 
