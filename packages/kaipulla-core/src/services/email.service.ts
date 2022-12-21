import { MailjetProvider, NodemailProvider, SendMailOptions } from "@helluwa/providers"

export class EmailService {

    public static sendMail = async ({ provider, mailOptions, providerConfig }: { provider: any, mailOptions: SendMailOptions, providerConfig: any }) => {
        if (provider === 'nodemailer') {
            const nodemailer = new NodemailProvider({ mailOptions, config: providerConfig })
            return await nodemailer.send()
        }

        if (provider === 'mailjet') {
            const mailjet = new MailjetProvider({ mailOptions, config: providerConfig })
            return await mailjet.send()
        }
    }
}