import { DataProvider } from "@helluwa/database"

export type MODEL_KEY =
'organizations' |
'secure-profiles' |
'users'


export type MODEL_OPTIONS = {
    db: DataProvider
    name: MODEL_KEY
}

