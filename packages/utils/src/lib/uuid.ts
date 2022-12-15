import { v4 } from 'uuid'

export const generateUUID4 = (): string => { 
    const uuid = v4() as string
    return uuid
}