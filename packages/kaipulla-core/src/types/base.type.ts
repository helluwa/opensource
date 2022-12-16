import { DataProvider } from "@helluwa/database"
import { EmailProviderConfig } from "./email.type"



export enum Model {
    Organization = 'organizations',
    SecureProfile = 'secure-profiles',
    User = 'users'
}

export type KaipullaCoreOptions = {
    db: DataProvider,
    encryption_key: string
}

type CustomHeaders = Headers & {
    authorization: string
}

export type ExtendedRequest = Omit<Request, 'headers'> & {
    headers: CustomHeaders
}


export type AuthenticationResultType = {
    authenticated: boolean
    profile: Profile | null
    error?: any
}


export type Organization = {
    name: string
    streetname: string
    houseno: string
    city: string
    postalcode: number
    country: string
    phone: string
    encrypted_profile: EncryptedProfile[]
}

export type EncryptedProfile = {
    id: string
    data: string
    label?: string
    expiresAt?: Date
    lastUsedAt?: Date
}

export type Profile = {
  //  emailProviderConfig: EmailProviderConfig
}

export type User = {
    id: string
    firstname: string
    lastname: string
    email: string
}

export type LoginCredentials = {
    email: string
    password: string
}
