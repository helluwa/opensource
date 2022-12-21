import { KaipullaApiError } from "./types/error.type";

export const formParseError: KaipullaApiError = {
    statusCode: 400,
    name: '400 - BadRequest',
    type: 'Http Error',
    message: 'Could not parse content as FormData.'
}

export const authenticationError: KaipullaApiError = {
    statusCode: 401,
    name: '401 - Unauthorized',
    type: 'Http Error',
    message: "The bearer token is not available in the header or Invalid"
}

export const getEmailServiceError = (message?: any): KaipullaApiError => ({
    statusCode: 500,
    name: '500 - InternalServerError',
    type: 'Email Service Error',
    message
})