import { KaipullaCore, createUpstashProvider } from '@helluwa/kaipulla-core'
import { Redis } from '@upstash/redis/with-fetch'

const kaipullaProto = {
  url: "https://eu2-closing-skunk-30334.upstash.io",
  token: "AXZ-ACQgMWY5ZGFiZGEtMTc0YS00ZGVlLTlmODYtOThiNmQ3NTFhNTUzZDY4OWEyZjUzNTg2NGY0Y2I3ODZhYjI3Y2UzZDMxZGU="
}

const ENCRYPTION_SECRET_KEY = 'yupl1za+WlirGjyNCWna6ZKnW1rDsZ/0YPLSwJjmmT0='
export const kaipulla = new KaipullaCore({ db: createUpstashProvider(new Redis({ ...kaipullaProto })), encryption_key: ENCRYPTION_SECRET_KEY }) 
