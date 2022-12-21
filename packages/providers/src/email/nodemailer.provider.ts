import nodemailer from 'nodemailer'
import { IEmailProvider, SendMailOptions, EMAIL_BASE_CONFIG, EmailProviderServiceResult } from './email-provider.type'

export type NODEMAILER_CONFIG = {
    host: string
    port: number
    username: string
    password: string
} & EMAIL_BASE_CONFIG


export class NodemailProvider implements IEmailProvider {
    private mailOptions: SendMailOptions
    private config: NODEMAILER_CONFIG

    constructor({ mailOptions, config }: { mailOptions: SendMailOptions, config: NODEMAILER_CONFIG }) {
        this.config = config
        this.mailOptions = mailOptions
    }

    async send(): Promise<EmailProviderServiceResult> {
        return new Promise<EmailProviderServiceResult>((resolve) => {
            const { from_email, from_name, host, port, username: user, password: pass } = this.config
            const transport = nodemailer.createTransport({
                host,
                port,
                auth: {
                    user,
                    pass
                }
            })

            const { subject, text, html, to, cc, bcc } = this.mailOptions

            const from = `"${from_name}" <${from_email}>`

            transport.sendMail({
                from,
                to,
                subject,
                text,
                html,
                cc,
                bcc
            }, (error, info) => {
                if (error) {
                    resolve({ success: false, error })
                } else {
                    resolve({ success: true, data: info })
                }
            });
        })
    }
}


