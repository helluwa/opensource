export type SendMailOptions = {
    to: string
    subject: string
    text?: string
    html?: string
    attachments?: any
    cc?: string
    bcc?: string
}

export type EmailProviderServiceResult = {
    success: boolean
    error?: any
    data?: any
}

export interface IEmailProvider {
    send: () => Promise<EmailProviderServiceResult>
}

export type EMAIL_BASE_CONFIG = {
    from_email: string
    from_name: string
    reply_to?: string
}

