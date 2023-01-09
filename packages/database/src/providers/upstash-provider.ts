import { BaseParam, CreateOneParams, DeleteOneParams, GetListPrams, GetManyParams, GetOneParams, UpdateParams, GenericDataProvider } from "../types/base"
import { Redis } from "@upstash/redis";
import { generateUUID4 } from '@helluwa/utils'

export class UpstashDataProvider<C extends string> implements GenericDataProvider<C> {

    constructor(private redis: Redis) { }

    async getList<T>({ model }: GetListPrams<C>): Promise<T[]> {
        return new Promise<Promise<T[]>>(async (resolve) => {
            resolve(await this.redis.hvals(model))
        })
    }

    async getMany<T>({ model, ids }: GetManyParams<C>): Promise<T[]> {
        return new Promise<T[]>(async (resolve) => {
            const res = await this.redis.hmget<Record<string, T>>(model, ...ids as string[])
            const data = Object.entries(res ?? {}).map(([key, value]) => ({
                id: key,
                ...value,
            }));
            resolve(data)
        })
    }

    async getOne<T>({ model, id }: GetOneParams<C>): Promise<T | null> {
        return new Promise<T | null>(async (resolve) => {
            const result = await this.redis.hget<T>(model, id as string)
            resolve(result)
        })
    }

    async create<T>({ model, values, overrideID }: CreateOneParams<T, C>): Promise<T & { id: string }> {
        return new Promise<T & { id: string }>(async (resolve) => {
            const id = overrideID ? overrideID : generateUUID4()
            await this.redis.hset(model, { [id]: { id, ...values } })
            const data = { id, ...values } as T & { id: string }
            resolve(data)
        })
    }

    async update<T>({ model, id, values }: UpdateParams<T, C>): Promise<T | null> {
        return new Promise<T | null>(async (resolve) => {
            const persistedData = await this.getOne<T>({ model, id })
            const updatedData = { ...persistedData, ...values } as T
            await this.redis.hset(model, { [id]: { ...updatedData } })
            resolve(updatedData)
        })
    }

    async deleteOne({ model, id }: DeleteOneParams<C>): Promise<boolean> {
        return new Promise<boolean>(async (resolve) => {
            const result = await this.redis.hdel(model, id as string)
            resolve(result === 1 ? true : false)
        })
    }

    async count({ model }: BaseParam<C>): Promise<number> {
        return new Promise<number>((resolve) => {
            this.redis.hlen(model).then(res => {
                resolve(res)
            })
        })
    }
}

export const createUpstashProvider = <C extends string>(redis: Redis) => {
    return new UpstashDataProvider<C>(redis)
}