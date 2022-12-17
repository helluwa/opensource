import { DataProvider } from "@helluwa/database";
import { MODEL_KEY, MODEL_OPTIONS } from "../types/model.type";

export class BaseModel {
    protected db: DataProvider
    protected name: MODEL_KEY

    constructor({ db, name }: MODEL_OPTIONS) {
        this.db = db
        this.name = name
    }

    public deleteById = async (id: string): Promise<boolean> => {
        return await this.db.deleteOne<MODEL_KEY>({ model: this.name, id })
    }
}