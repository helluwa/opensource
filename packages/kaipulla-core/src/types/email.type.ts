import { NODEMAILER_CONFIG, MAILJET_CONFIG } from '@helluwa/providers'

type PROVIDER_KEYS = {
    nodemailer: NODEMAILER_CONFIG
    mailjet: MAILJET_CONFIG
}

type ConditionalProvider<T> = { [K in keyof T]: { provider: K; providerConfig: T[K] } }[keyof T]

export type EmailProviderConfig = ConditionalProvider<PROVIDER_KEYS>
