import { randomBytes } from "crypto"
import { decrypt, encrypt, getHashString } from "../helpers/encryption"
import { EncryptedProfileType, ProfileDataType, ProfileType } from "../types/base.type"
import { MODEL_KEY, MODEL_OPTIONS } from "../types/model.type"
import { BaseModel } from "./base.model"

export class ProfileModel extends BaseModel {

    constructor(modelOptions: MODEL_OPTIONS, private secret_key: string) {
        super(modelOptions)
    }

    public createProfile = (profile: ProfileType): Promise<string> => {
        return new Promise<string>((resolve) => {
            const { label, expiresAt, description } = profile
            const createdAt = new Date()
            const bearerToken = this._generateBearerToken()
            const hashedBearerToken = getHashString(bearerToken, this.secret_key)
            const stringifiedProfile = JSON.stringify(profile)
            const data = encrypt(stringifiedProfile, this.secret_key)
            this.db.create<EncryptedProfileType, MODEL_KEY>({ model: 'secure-profiles', values: { data, label, expiresAt, createdAt, description }, overrideID: hashedBearerToken }).then(res => {
                console.log(res)
            })
            resolve(bearerToken)
        })
    }

    public getList = (): Promise<ProfileType[]> => {
        return new Promise<ProfileType[]>(async (resolve) => {
            const profiles: ProfileType[] = []

            const encryptedProfiles = await this.db.getList<EncryptedProfileType, MODEL_KEY>({ model: 'secure-profiles' })

            if (Array.isArray(encryptedProfiles)) {
                encryptedProfiles.forEach(secureProfile => {
                    const { data, ...rest } = secureProfile
                    const decryptedDataString = decrypt(data, this.secret_key)
                    const profileData = JSON.parse(decryptedDataString) as ProfileDataType
                    const profile: ProfileType = {
                        ...rest,
                        ...profileData
                    }
                    profiles.push(profile)
                })
            }
            resolve(profiles)
        })
    }

    private _generateBearerToken = (): string => {
        return randomBytes(128).toString('hex')
    }

}