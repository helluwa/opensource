import mailjet from 'node-mailjet'
import { IEmailProvider, SendMailOptions, EMAIL_BASE_CONFIG, EmailProviderServiceResult } from "./email-provider.type";

export type MAILJET_CONFIG = EMAIL_BASE_CONFIG & {
    public_key: string
    secret_key: string
}

type RecieverType = {
    Email: string
}

export class MailjetProvider implements IEmailProvider {
    private mailOptions: SendMailOptions
    private config: MAILJET_CONFIG

    constructor({ mailOptions, config }: { mailOptions: SendMailOptions, config: MAILJET_CONFIG }) {
        this.config = config
        this.mailOptions = mailOptions
    }

    private _processArrayStringToObject(content?: string): RecieverType[] {
        const data: RecieverType[] = []
        if (content) {
            const parsedContent = JSON.parse(content) as string[]
            if (parsedContent && parsedContent.length > 0) {
                parsedContent.forEach(c => {
                    const receiver: RecieverType = {
                        Email: c
                    }
                    data.push(receiver)
                })
            }
        }
        return data
    }

    async send(): Promise<EmailProviderServiceResult> {
        return new Promise<EmailProviderServiceResult>(async (resolve) => {
            const { public_key, secret_key, from_email, from_name } = this.config
            const { to, subject, text, html, cc, bcc } = this.mailOptions

            try {
                const result = await mailjet.apiConnect(public_key, secret_key).post('send', { version: 'v3.1' }).request({
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
                            Cc: this._processArrayStringToObject(cc),
                            Bcc: this._processArrayStringToObject(bcc),
                            Subject: subject,
                            TextPart: text,
                            HTMLPart: html
                        },
                    ],
                })

                resolve({ success: true, data: result.body })
            } catch (error: any) {
                if (error) {
                    const errorData = {
                        statusCode: error.statusCode,
                        statusText: error.statusText,
                        originalMessage: error.originalMessage,
                        ErrorMessage: error.ErrorMessage,
                        ErrorCode: error.ErrorCode,
                        ErrorIdentifier: error.ErrorIdentifier,
                        ErrorRelatedTo: error.ErrorRelatedTo
                    }
                    resolve({ success: false, error: errorData })
                }
            }
        })
    }

}