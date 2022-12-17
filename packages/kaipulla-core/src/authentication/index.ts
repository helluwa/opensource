import HttpError from 'http-errors'
import { isNil } from 'lodash'
import { AuthenticationResultType, EncryptedProfileType, ExtendedRequest, KaipullaCoreOptions, ProfileType } from "../types/base.type";
import { MODEL_KEY } from '../types/model.type';
import { decrypt, getHashString } from "./encryption";

export class Auth {

    constructor(private kaipullaCoreOptions: KaipullaCoreOptions) { }

    public async authenticateByAuthorizationHeaderString(authorizationString: string): Promise<AuthenticationResultType> {
        if (!authorizationString) {
            throw new HttpError.Forbidden('Bearer token not found | Forbidden Access')
        }
        const result = await this._authenticate(this._getToken(authorizationString))
        return result
    }

    public async authenticateByRequest(request: any): Promise<AuthenticationResultType> {
        const req = request as ExtendedRequest
        const token = this._getToken(req.headers.authorization)
        const result = await this._authenticate(token)
        return result
    }

    private async _authenticate(bearerToken: string) {
        return new Promise<AuthenticationResultType>(async (resolve) => {

            const hashedBearerToken = getHashString(bearerToken, this.kaipullaCoreOptions.encryption_key)

            const encryptedProfile = await this.kaipullaCoreOptions.db.getOne<EncryptedProfileType, MODEL_KEY>({ model: 'secure-profiles', id: hashedBearerToken })

            if (encryptedProfile?.data) {
                const decryptedDataString = decrypt(encryptedProfile.data, this.kaipullaCoreOptions.encryption_key)
                const profile = JSON.parse(decryptedDataString) as ProfileType

                const now = new Date()

                // Check Token life
                if (!isNil(encryptedProfile.expiresAt)) {
                    const expirationDate = new Date(encryptedProfile.expiresAt)
                    if (expirationDate < now) {
                        resolve({ authenticated: false, profile: null, error: HttpError.Unauthorized('Token Expired') })
                    }
                }

                //  Last use timestamp
                await this.kaipullaCoreOptions.db.update<EncryptedProfileType, MODEL_KEY>({ model: 'secure-profiles', id: hashedBearerToken, values: { lastUsedAt: now } })

                resolve({ authenticated: true, profile })
            } else {
                resolve({ authenticated: false, profile: null })
            }
        })
    }

    private _getToken(bearerToken: string): string {
        const splitedAuthorization = bearerToken.split(/\s+/)

        if (splitedAuthorization[0].toLowerCase() !== 'bearer' || splitedAuthorization.length !== 2) {
            throw new HttpError.Forbidden('Bearer token not found | Forbidden Access')
        }

        return splitedAuthorization[1]
    }
}