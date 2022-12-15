export type DataKeyType = string | number

export type BaseParam = {
    model: string
}

export type GetListPrams = BaseParam
export type GetManyParams = BaseParam & { ids: DataKeyType[] }
export type GetOneParams = BaseParam & { id: DataKeyType }
export type CreateOneParams<T> = BaseParam & { values: Omit<T, 'id'>, overrideID?: string }
export type UpdateParams<T> = BaseParam & { id: DataKeyType, values: Partial<T> }
export type DeleteOneParams = BaseParam & { id: DataKeyType }

export type DataProvider = {
    getList: <T>(params: GetListPrams) => Promise<T[]>
    getMany: <T>(params: GetManyParams) => Promise<T[]>
    getOne: <T>(params: GetOneParams) => Promise<T | null>
    create: <T>(params: CreateOneParams<T>) => Promise<T & { id: string }>
    update: <T>(params: UpdateParams<T>) => Promise<T | null>
    deleteOne: (params: DeleteOneParams) => Promise<boolean>
    count: (params: BaseParam) => Promise<number>
}