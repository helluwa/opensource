import { Auth } from './authentication'
import { Content } from './model'
import { KaipullaApiResult, KaipullaCoreOptions, ServiceType } from './types/base.type'
import { ActionArgs } from '@remix-run/node'
import { authenticationError, formParseError, getEmailServiceError } from './errors'
import { EmailService } from './services/email.service'
import { SendMailOptions } from '@helluwa/providers'
export class KaipullaCore {

    auth: Auth
    content: Content

    constructor(private kaipullaCoreOptions: KaipullaCoreOptions) {
        this.auth = this._initAuth(kaipullaCoreOptions)
        this.content = this._initContent(kaipullaCoreOptions)
    }

    private _checkProperties({ to, subject, text, html }: SendMailOptions): { hasError: boolean, message: string } {
        let hasError = false
        let emptyProperties = ''

        if (!to) {
            hasError = true
            emptyProperties += ' to '
        }

        if (!subject) {
            hasError = true
            emptyProperties += ' subject '
        }

        if (!text && !html) {
            hasError = true
            emptyProperties += ` text or html `
        }

        return { hasError, message: `Properties ${emptyProperties} missing` }
    }


    public remixActionHandler = async ({ request }: ActionArgs): Promise<KaipullaApiResult> => {

        return new Promise<KaipullaApiResult>(async (resolve) => {

            const authorization = request.headers.get('authorization')
            const authenticatedResult = await this.auth.authenticateByAuthorizationHeaderString(authorization)

            if (!authenticatedResult.authenticated) {
                resolve({
                    success: false,
                    error: authenticationError
                })
            }

            const url = new URL(request.url)
            const service = url.searchParams.get('service') as ServiceType

            if (!service) {
                resolve({
                    success: false,
                    error: {
                        statusCode: 500,
                        type: 'Application Error',
                        name: '500 - InternalServerError',
                        message: 'The service Type is not Specified.'
                    }
                })
            } else if (service === 'email') {
                try {
                    const formData = await request.formData()
                    const to = formData.get('to') as string
                    const subject = formData.get('subject') as string
                    const text = formData.get('text') as string
                    const html = formData.get('html') as string
                    const cc = formData.get('cc') as string
                    const bcc = formData.get('bcc') as string

                    const checkProperties = this._checkProperties({ to, subject, text, html })

                    if (checkProperties.hasError) {
                        return resolve({
                            success: false, error: {
                                statusCode: 406,
                                type: 'Application Error',
                                name: '406 - NotAcceptable',
                                message: checkProperties.message
                            }
                        })
                    }

                    const mailOptions: SendMailOptions = {
                        to,
                        subject,
                        text,
                        html,
                        cc,
                        bcc
                    }

                    const emailServiceResult = await EmailService.sendMail({
                        provider: authenticatedResult.profile?.emailProviderConfig.provider,
                        providerConfig: authenticatedResult.profile?.emailProviderConfig.providerConfig,
                        mailOptions
                    })

                    if (!emailServiceResult?.success) {
                        resolve({ success: false, error: getEmailServiceError(emailServiceResult?.error) })
                    } else {
                        resolve({ success: true, data: emailServiceResult.data })
                    }

                } catch (e: any) {
                    if (e) {
                        resolve({ success: false, error: formParseError })
                    }
                }
            } else if (service === 'pdf') {
                resolve({ success: true, data: 'PDF Service In Progress' })
            } else {
                resolve({
                    success: false, error: {
                        statusCode: 503,
                        name: '503 - ServiceUnavailable',
                        type: 'Application Error',
                        message: `The given --${service}-- service type is unavailable.`
                    }
                })
            }
        })
    }


    private _initAuth(kaipullCoreOptions: KaipullaCoreOptions): Auth {
        return new Auth(kaipullCoreOptions)
    }

    private _initContent(kaipullaCoreOptions: KaipullaCoreOptions) {
        return new Content(kaipullaCoreOptions)
    }
}