import { randomBytes } from "crypto"
import { encrypt, getHashString } from "../authentication/encryption"
import { EncryptedProfileType, ProfileType } from "../types/base.type"
import { MODEL_KEY, MODEL_OPTIONS } from "../types/model.type"
import { BaseModel } from "./base.model"

export class ProfileModel extends BaseModel {

    constructor(modelOptions: MODEL_OPTIONS, private secret_key: string) {
        super(modelOptions)
    }

    public createProfile = (profile: ProfileType): Promise<string> => {
        return new Promise<string>((resolve) => {
            const bearerToken = this._generateBearerToken()
            const hashedBearerToken = getHashString(bearerToken, this.secret_key)
            const stringifiedProfile = JSON.stringify(profile)
            const data = encrypt(stringifiedProfile, this.secret_key)
            this.db.create<EncryptedProfileType, MODEL_KEY>({ model: 'secure-profiles', values: { data }, overrideID: hashedBearerToken }).then(res => {
                console.log(res)
            })
            resolve(bearerToken)
        })
    }

    private _generateBearerToken = (): string => {
        return randomBytes(128).toString('hex')
    }

}