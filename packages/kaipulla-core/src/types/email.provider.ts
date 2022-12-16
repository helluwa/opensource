export type SendMailMailOptions = {
    to: string
    subject: string
    text?: string
    html?: string
    attachments?: any
}

export interface IEmailProvider {
    send: () => void
}

type ConditionalProvider<T> = { [K in keyof T]: { provider: K; providerConfig: T[K] } }[keyof T]

export type EMAIL_BASE_CONFIG = {
    from_email: string
    from_name: string
}

export type NODEMAILER_CONFIG = {
    host: string
    port: number
    username: string
    password: string
} & EMAIL_BASE_CONFIG

export type MAILJET_CONFIG = EMAIL_BASE_CONFIG & {
    public_key: string
    secret_key: string
}

type ProviderKeys = {
    nodemailer: NODEMAILER_CONFIG
    mailjet: MAILJET_CONFIG
}

export type EmailProviderConfig = ConditionalProvider<ProviderKeys>

export type EmailServiceType = EmailProviderConfig & {
    mailOptions: SendMailMailOptions
}
