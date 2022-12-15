import { v4 } from 'uuid'

const generateUUID4 = (): string => {
    const uuid = v4() as string
    return uuid
}


const UUID = {
    generateUUID4
}

export default UUID