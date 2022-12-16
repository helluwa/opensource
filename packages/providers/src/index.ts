import { SendMailOptions } from "./email/email-provider.type";
import { MailjetProvider, MAILJET_CONFIG } from "./email/mailjet.provider";
import { NODEMAILER_CONFIG, NodemailProvider } from './email/nodemailer.provider'

export {
    MailjetProvider,
    NodemailProvider
}

export type {  
    NODEMAILER_CONFIG,
    MAILJET_CONFIG,
    SendMailOptions  
}
