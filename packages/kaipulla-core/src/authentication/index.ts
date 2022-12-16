import { DataProvider } from "@helluwa/database";
import { hash } from "bcrypt";
import HttpError from 'http-errors'
import { isNil } from 'lodash'
import { AuthenticationResultType, EncryptedProfile, ExtendedRequest, KaipullaCoreOptions, Model, Profile } from "../types/base.type";
import { decrypt, getHashString } from "./encryption";



export class Auth {

    constructor(private kaipullaCoreOptions: KaipullaCoreOptions) { }

    public getBearerTokenFromHeader(request: ExtendedRequest) {
        if (request.headers && request.headers.authorization) {
            const splitedAuthorization = request.headers.authorization.split(/\s+/)

            if (splitedAuthorization[0].toLowerCase() !== 'bearer' || splitedAuthorization.length !== 2) {
                return null;
            }

            return splitedAuthorization[1]
        } else {
            throw new HttpError.Forbidden('Bearer token not found | Forbidden Access')
        }
    }

    public async authenticate(request: ExtendedRequest) {
        return new Promise<AuthenticationResultType>(async (resolve) => {

            const bearerToken = this.getBearerTokenFromHeader(request)

            if (!bearerToken) {
                return { authenticated: false }
            }

            const hashedBearerToken = getHashString(bearerToken, this.kaipullaCoreOptions.encryption_key)

            const encryptedProfile = await this.kaipullaCoreOptions.db.getOne<EncryptedProfile>({ model: Model.SecureProfile, id: hashedBearerToken })

            if (encryptedProfile?.data) {
                const decryptedDataString = decrypt(encryptedProfile.data, this.kaipullaCoreOptions.encryption_key)
                const profile = JSON.parse(decryptedDataString) as Profile

                const now = new Date()

                // Check Token life
                if (!isNil(encryptedProfile.expiresAt)) {
                    const expirationDate = new Date(encryptedProfile.expiresAt)
                    if (expirationDate < now) {
                        resolve({ authenticated: false, profile: null, error: HttpError.Unauthorized('Token Expired') })
                    }
                }

                //  Last use timestamp
                await this.kaipullaCoreOptions.db.update<EncryptedProfile>({ model: Model.SecureProfile, id: hashedBearerToken, values: { lastUsedAt: now } })

                resolve({ authenticated: true, profile })
            } else {
                resolve({ authenticated: false, profile: null })
            }
        })
    }
}