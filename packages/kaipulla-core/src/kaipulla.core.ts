import { Auth } from './authentication'
import { Content } from './model'
import { KaipullaCoreOptions } from './types/base.type'
import { Handler } from './handler'
export class KaipullaCore {
    private kaipullaCoreOptions: KaipullaCoreOptions
    auth: Auth
    content: Content
    handler: Handler

    constructor(kaipullaCoreOptions: KaipullaCoreOptions) {
        this.kaipullaCoreOptions = kaipullaCoreOptions
        this.auth = this._initAuth()
        this.content = this._initContent()
        this.handler = this._initHandler()
    }

    private _initAuth(): Auth {
        return new Auth(this.kaipullaCoreOptions)
    }

    private _initContent() {
        return new Content(this.kaipullaCoreOptions)
    }

    private _initHandler() {
        return new Handler(this.auth)
    }
}