import nodemailer from 'nodemailer'
import { IEmailProvider, SendMailOptions, EMAIL_BASE_CONFIG } from './email-provider.type'

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

    send() {
        const { from_email, from_name, host, port, username: user, password: pass } = this.config

        const transport = nodemailer.createTransport({
            host,
            port,
            auth: {
                user,
                pass
            }
        })

        const { subject, text, html, to } = this.mailOptions

        const from = `"${from_name}" <${from_email}>`

        console.log('Manipulated From Name', from)

        transport.sendMail({
            from,
            to,
            subject,
            text,
            html

        }, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
        });
    }
}


