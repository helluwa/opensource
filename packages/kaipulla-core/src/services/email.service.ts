import { MailjetProvider, NodemailProvider } from "@helluwa/providers"

export const sendMail = async ({ provider, mailOptions, providerConfig }: any) => {

    if (provider === 'nodemailer') {
        const nodemailer = new NodemailProvider({ mailOptions, config: providerConfig })
        nodemailer.send()
    }

    if (provider === 'mailjet') {
        const mailjet = new MailjetProvider({ mailOptions, config: providerConfig })
        mailjet.send()
    }
}