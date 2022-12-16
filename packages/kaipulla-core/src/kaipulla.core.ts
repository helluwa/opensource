import { Auth } from './authentication'
import { KaipullaCoreOptions } from './types/base.type'

export class KaipullaCore {

    auth: Auth

    constructor(private kaipullaCoreOptions: KaipullaCoreOptions) {
        this.auth = this._initAuth(kaipullaCoreOptions)
    }

    private _initAuth(kaipullCoreOptions: KaipullaCoreOptions): Auth {
        return new Auth(kaipullCoreOptions)
    }
}