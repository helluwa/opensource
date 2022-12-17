import { KaipullaCoreOptions } from "../../dist";
import { MODEL_OPTIONS } from "../types/model.type";
import { ProfileModel } from "./profile.model";
import { UserModel } from "./user.model";

export class Content {

    user: UserModel
    profile: ProfileModel

    constructor({db, encryption_key}: KaipullaCoreOptions) {
        this.user = this._initUser({ db })
        this.profile = this._initProfile({db, encryption_key})
    }

    private _initUser({ db }: Omit<MODEL_OPTIONS, 'name'>) {
        return new UserModel({ db, name: 'users' })
    }

    private _initProfile({db, encryption_key}: KaipullaCoreOptions) {
        return new ProfileModel({db, name:'secure-profiles'}, encryption_key)
    }
}