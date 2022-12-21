import { LoginCredentials, UserType, UserWtihPasswordType } from "../types/base.type";
import { MODEL_KEY, MODEL_OPTIONS } from "../types/model.type";
import { BaseModel } from "./base.model";
import { DatabaseError } from '@helluwa/utils'
import { comparePassword, getSaltedPassword } from "../helpers/encryption";

export class UserModel extends BaseModel {
    constructor(modelOptions: MODEL_OPTIONS) {
        super(modelOptions)
    }

    public isEmailExists = async (email: string): Promise<boolean> => {
        return new Promise<boolean>((resolve) => {
            this.db.getList<UserType, MODEL_KEY>({ model: 'users' }).then(res => {
                for (let i = 0; i < res.length; i++) {
                    if (res[i].email === email) {
                        resolve(true)
                    }
                }
                resolve(false)
            })
        })
    }

    public create = async ({ password, ...userCredentials }: Omit<UserWtihPasswordType, 'id'>): Promise<UserType> => {

        if (await this.isEmailExists(userCredentials.email)) {
            throw new DatabaseError('Given Email Exists Already')
        }

        const hasedPassword = await getSaltedPassword(password)
        return new Promise<UserType>((resolve) => {
            this.db.create<UserWtihPasswordType, MODEL_KEY>({ model: 'users', values: { ...userCredentials, password: hasedPassword } }).then(
                res => {
                    const { password, ...restUser } = res
                    resolve(restUser)
                }
            )
        })
    }

    public getList = (): Promise<UserType[]> => {
        return new Promise<UserType[]>((resolve) => {
            const users: UserType[] = []

            this.db.getList<UserWtihPasswordType, MODEL_KEY>({ model: 'users' }).then(res => {
                if (res.length > 0) {
                    res.forEach(r => {
                        const { password, ...user } = r
                        users.push(user)
                    })
                    resolve(users)
                } else {
                    resolve(users)
                }
            })
        })
    }

    public login = async ({ email, password }: LoginCredentials): Promise<UserType> => {
        return new Promise<UserType>(async (resolve, reject) => {
            const users = await this.db.getList<UserWtihPasswordType, MODEL_KEY>({ model: 'users' })
            const filteredUser = users.filter(user => user.email === email)

            if (filteredUser.length > 0) {
                const passwrodCompareResult = await comparePassword(password, filteredUser[0].password)
                if (!passwrodCompareResult) {
                    throw new DatabaseError('Password mis match')
                } else {
                    const { password, ...user } = filteredUser[0]
                    resolve(user)
                }
            } else {
                throw new DatabaseError('Given Email not Exists')
            }
        })
    }
}


