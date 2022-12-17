import { Auth } from './authentication'
import { Content } from './model'
import { KaipullaCoreOptions } from './types/base.type'

export class KaipullaCore {

    auth: Auth
    content: Content

    constructor(private kaipullaCoreOptions: KaipullaCoreOptions) {
        this.auth = this._initAuth(kaipullaCoreOptions)
        this.content = this._initContent(kaipullaCoreOptions)
    }

    private _initAuth(kaipullCoreOptions: KaipullaCoreOptions): Auth {
        return new Auth(kaipullCoreOptions)
    }

    private _initContent(kaipullaCoreOptions: KaipullaCoreOptions) {
        return new Content(kaipullaCoreOptions)
    }
}