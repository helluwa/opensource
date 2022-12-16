import mailjet from 'node-mailjet'
import { IEmailProvider, SendMailOptions, EMAIL_BASE_CONFIG } from "./email-provider.type";

export type MAILJET_CONFIG = EMAIL_BASE_CONFIG & {
    public_key: string
    secret_key: string
}

export class MailjetProvider implements IEmailProvider {
    private mailOptions: SendMailOptions
    private config: MAILJET_CONFIG

    constructor({ mailOptions, config }: { mailOptions: SendMailOptions, config: MAILJET_CONFIG }) {
        this.config = config
        this.mailOptions = mailOptions
    }

    send() {
        const { public_key, secret_key, from_email, from_name } = this.config
        const { to, subject, text, html } = this.mailOptions
        mailjet.apiConnect(public_key, secret_key).post('send', { version: 'v3.1' }).request({
            Messages: [
                {
                    From: {
                        Email: from_email,
                        Name: from_name,
                    },
                    To: [
                        {
                            Email: to
                        },
                    ],
                    Subject: subject,
                    TextPart: text,
                    HTMLPart: html
                },
            ],
        }).then(res => {
            console.log(res)
        })
    }

}