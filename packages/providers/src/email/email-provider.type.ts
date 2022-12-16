export type SendMailOptions = {
    to: string
    subject: string
    text?: string
    html?: string
    attachments?: any
    cc?: string
    bcc?: string
}

export interface IEmailProvider {
    send: () => void
}

export type EMAIL_BASE_CONFIG = {
    from_email: string
    from_name: string
    reply_to?: string
}

