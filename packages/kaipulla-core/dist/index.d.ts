import { DataProvider } from '@helluwa/database';
export { createUpstashProvider, initDatabase } from '@helluwa/database';

declare type ConditionalProvider<T> = {
    [K in keyof T]: {
        provider: K;
        providerConfig: T[K];
    };
}[keyof T];
declare type EMAIL_BASE_CONFIG = {
    from_email: string;
    from_name: string;
};
declare type NODEMAILER_CONFIG = {
    host: string;
    port: number;
    username: string;
    password: string;
} & EMAIL_BASE_CONFIG;
declare type MAILJET_CONFIG = EMAIL_BASE_CONFIG & {
    public_key: string;
    secret_key: string;
};
declare type ProviderKeys = {
    nodemailer: NODEMAILER_CONFIG;
    mailjet: MAILJET_CONFIG;
};
declare type EmailProviderConfig = ConditionalProvider<ProviderKeys>;

declare type KaipullaCoreOptions = {
    db: DataProvider;
    encryption_key: string;
};
declare type CustomHeaders = Headers & {
    authorization: string;
};
declare type ExtendedRequest = Omit<Request, 'headers'> & {
    headers: CustomHeaders;
};
declare type AuthenticationResultType = {
    authenticated: boolean;
    profile: Profile | null;
    error?: any;
};
declare type Profile = {
    emailProviderConfig: EmailProviderConfig;
};

declare class Auth {
    private kaipullaCoreOptions;
    constructor(kaipullaCoreOptions: KaipullaCoreOptions);
    getBearerTokenFromHeader(request: ExtendedRequest): string | null;
    authenticate(request: ExtendedRequest): Promise<AuthenticationResultType>;
}

declare class KaipullaCore {
    private kaipullaCoreOptions;
    auth: Auth;
    constructor(kaipullaCoreOptions: KaipullaCoreOptions);
    private _initAuth;
}

export { ExtendedRequest, KaipullaCore, KaipullaCoreOptions };
