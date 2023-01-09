export type DataKeyType = string | number

export type BaseParam<M> = {
    model: M
}

export type GetListPrams<M> = BaseParam<M>
export type GetManyParams<M> = BaseParam<M> & { ids: DataKeyType[] }
export type GetOneParams<M> = BaseParam<M> & { id: DataKeyType }
export type CreateOneParams<T, M> = BaseParam<M> & { values: Omit<T, 'id'>, overrideID?: string }
export type UpdateParams<T, M> = BaseParam<M> & { id: DataKeyType, values: Partial<T> }
export type DeleteOneParams<M> = BaseParam<M> & { id: DataKeyType }

export type DataProvider = {
    getList: <T, M extends string>(params: GetListPrams<M>) => Promise<T[]>
    getMany: <T, M extends string>(params: GetManyParams<M>) => Promise<T[]>
    getOne: <T, M extends string>(params: GetOneParams<M>) => Promise<T | null>
    create: <T, M extends string>(params: CreateOneParams<T, M>) => Promise<T & { id: string }>
    update: <T, M extends string>(params: UpdateParams<T, M>) => Promise<T | null>
    deleteOne: <M extends string>(params: DeleteOneParams<M>) => Promise<boolean>
    count: <M extends string>(params: BaseParam<M>) => Promise<number>
}

export type GenericDataProvider<M extends string> = {
    getList: <T>(params: GetListPrams<M>) => Promise<T[]>
    getMany: <T>(params: GetManyParams<M>) => Promise<T[]>
    getOne: <T>(params: GetOneParams<M>) => Promise<T | null>
    create: <T>(params: CreateOneParams<T, M>) => Promise<T & { id: string }>
    update: <T>(params: UpdateParams<T, M>) => Promise<T | null>
    deleteOne: (params: DeleteOneParams<M>) => Promise<boolean>
    count: (params: BaseParam<M>) => Promise<number>
}