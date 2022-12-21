import { DataProvider } from "@helluwa/database"
import { EmailProviderConfig } from "./email.type"
import { KaipullaApiError } from "./error.type";

export type ConditionalProvider<T> = { [K in keyof T]: { provider: K; providerConfig: T[K] } }[keyof T]

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

export type ProfileBase = {
    id: string
    label?: string
    description?: string
    expiresAt?: Date
    createdAt?: Date
    lastUsedAt?: Date
}

export type EncryptedProfileType = ProfileBase & {
    data: string
}

export type ProfileType = ProfileBase & ProfileDataType

export type ProfileDataType = {
    emailProviderConfig: EmailProviderConfig
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

export type KaipullaApiResult = {
    success: boolean
    data?: any
    error?: KaipullaApiError
}

export type ServiceType = 'email' | 'pdf'