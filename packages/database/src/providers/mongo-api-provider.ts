import { BaseParam, CreateOneParams, DeleteOneParams, GenericDataProvider, GetListPrams, GetManyParams, GetOneParams, UpdateParams } from "../types/base";
import { MongoDBDataAPI, Config } from 'mongodb-data-api'
import { generateUUID4 } from "@helluwa/utils";

export type BaseParams = {
    dataSource?: string
    database?: string
    collection?: string
    [key: string]: any
}

export class MongoDataApiProvider<C extends string> implements GenericDataProvider<C> {

    private dataApi: MongoDBDataAPI

    constructor(config: Config, baseParams?: BaseParams) {
        this.dataApi = new MongoDBDataAPI(config, baseParams)
    }

    async getList<T>({ model }: GetListPrams<C>): Promise<T[]> {
        return new Promise<T[]>(async (resolve) => {
            const { documents } = await this.dataApi.find<T>({ collection: model })
            resolve(documents)
        })
    }

    async getMany<T>(params: GetManyParams<C>): Promise<T[]> {
        return new Promise<T[]>(async (resolve) => {
            console.log(params)
            const { documents } = await this.dataApi.find<T>()
            resolve(documents)
        })
    }

    async getOne<T>(params: GetOneParams<C>): Promise<T | null> {
        return new Promise<T | null>(async (resolve) => {
            const response = await this.dataApi.findOne({
                "filter": {
                    "id": params.id
                },
                collection: params.model
            })
            resolve(response.document as T | null)
        })
    }

    async create<T>({ model, values, overrideID }: CreateOneParams<T, C>): Promise<any> {
        return new Promise<any>(async (resolve) => {
            const id = overrideID ? overrideID : generateUUID4()
            await this.dataApi.insertOne<T>({ document: { id, ...values }, collection: model })
            resolve({ id, ...values })
        })
    }

    async update<T>({ model, values, id }: UpdateParams<T, C>): Promise<any> {
        return new Promise<any>(async (resolve) => {
            const persistedData = await this.getOne({ model, id }) as T & { _id: string }
            const { _id, ...restData } = { ...persistedData, ...values }
            const result = await this.dataApi.updateOne({
                collection: model, filter: {
                    "_id": { "$oid": persistedData._id }
                },
                update: { ...restData }
            })
            console.log(result)
            resolve('hit')
        })
    }

    async deleteOne(params: DeleteOneParams<C>): Promise<boolean> {
        return new Promise<boolean>(async (resolve) => {
            const { deletedCount } = await this.dataApi.deleteOne({ filter: { id: params.id }, collection: params.model })
            resolve(deletedCount === 1 ? true : false)
        })
    }

    async count({ model }: BaseParam<C>): Promise<number> {
        return new Promise<number>(async (resolve) => {
            const { documents } = await this.dataApi.aggregate({ pipeline: [], collection: model })
            resolve(documents ? documents.length : 0)
        })
    }
}

export const createMongoDataApiProvider = <C extends string>(config: Config, baseParams?: BaseParams) => {
    return new MongoDataApiProvider<C>(config, baseParams)
}