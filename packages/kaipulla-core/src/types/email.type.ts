import { NODEMAILER_CONFIG, MAILJET_CONFIG } from '@helluwa/providers'
import { ConditionalProvider } from './base.type'

type PROVIDER_KEYS = {
    nodemailer: NODEMAILER_CONFIG
    mailjet: MAILJET_CONFIG
}

export type EmailProviderConfig = ConditionalProvider<PROVIDER_KEYS>

export type EMAIL_BASE_CONFIG = {
    from_email: string
    from_name: string
    reply_to?: string
}

export type SendMailOptions = {
    to: string
    subject: string
    text?: string
    html?: string
    attachments?: any
    cc?: string
    bcc?: string
}
