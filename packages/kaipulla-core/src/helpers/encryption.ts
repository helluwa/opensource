import bcrypt from 'bcrypt'
import { AES, enc } from 'crypto-js';

import { createHmac } from "crypto";

export const getHashString = (accessKey: string, secret_key:string) => {
    return createHmac('sha512', secret_key)
        .update(accessKey)
        .digest('hex');
};


export const encrypt = (data: any, secret_key: string): string => {
    return AES.encrypt(JSON.stringify(data), secret_key).toString()
}

export const decrypt = (cipherText: string, secret_key: string): string => {
    let bytes = AES.decrypt(cipherText, secret_key)
    const data = JSON.parse(bytes.toString(enc.Utf8))
    return data
}


export const getSaltedPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10)
    const hasedPassword = await bcrypt.hash(password, salt);
    return hasedPassword
}

export const comparePassword = async (password: string, hasedPassword: string): Promise<boolean> => {
    const result = await bcrypt.compare(password, hasedPassword)
    return result
}