
export type ErrorType = 'Application Error' | 'Http Error' | 'Database Error' | 'Email Service Error'

export type StatusCode =
    400 |
    401 |
    402 |
    403 |
    404 |
    405 |
    406 |
    407 |
    408 |
    409 |
    410 |
    411 |
    412 |
    413 |
    414 |
    415 |
    416 |
    417 |
    418 |
    421 |
    422 |
    423 |
    424 |
    425 |
    426 |
    428 |
    429 |
    431 |
    451 |
    500 |
    501 |
    502 |
    503 |
    504 |
    505 |
    506 |
    507 |
    508 |
    509 |
    510 |
    511

export type StatusName =
    '400 - BadRequest' |
    '401 - Unauthorized' |
    '402 - PaymentRequired' |
    '403 - Forbidden' |
    '404 - NotFound' |
    '405 - MethodNotAllowed' |
    '406 - NotAcceptable' |
    '407 - ProxyAuthenticationRequired' |
    '408 - RequestTimeout' |
    '409 - Conflict' |
    '410 - Gone' |
    '411 - LengthRequired' |
    '412 - PreconditionFailed' |
    '413 - PayloadTooLarge' |
    '414 - URITooLong' |
    '415 - UnsupportedMediaType' |
    '416 - RangeNotSatisfiable' |
    '417 - ExpectationFailed' |
    '418 - ImATeapot' |
    '421 - MisdirectedRequest' |
    '422- UnprocessableEntity' |
    '423 - Locked' |
    '424 - FailedDependency' |
    '425 - TooEarly' |
    '426 - UpgradeRequired' |
    '428 - PreconditionRequired' |
    '429 - TooManyRequests' |
    '431 - RequestHeaderFieldsTooLarge' |
    '451 - UnavailableForLegalReasons' |
    '500 - InternalServerError' |
    '501 - NotImplemented' |
    '502 - BadGateway' |
    '503 - ServiceUnavailable' |
    '504 - GatewayTimeout' |
    '505 - HTTPVersionNotSupported' |
    '506 - VariantAlsoNegotiates' |
    '507 - InsufficientStorage' |
    '508 - LoopDetected' |
    '509 - BandwidthLimitExceeded' |
    '510 - NotExtended' |
    '511 - NetworkAuthenticationRequire'





export type KaipullaApiError = {
    statusCode: StatusCode
    type: ErrorType
    name: StatusName
    message: string | null
    details?: any
}
