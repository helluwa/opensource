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
    profile: ProfileType | null
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
    encrypted_profile: EncryptedProfileType[]
}

export type EncryptedProfileType = {
    id: string
    data: string
    label?: string
    expiresAt?: Date
    lastUsedAt?: Date
}

export type ProfileType = {
  //  emailProviderConfig: EmailProviderConfig
}

export type UserType = {
    id: string
    firstname: string
    lastname: string
    email: string
}

export type LoginCredentials = {
    email: string
    password: string
}


export type UserWtihPasswordType = UserType & {
    password: string
}
