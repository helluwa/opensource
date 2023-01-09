import { createUpstashProvider } from "./providers/upstash-provider";
import { createMongoDataApiProvider } from './providers/mongo-api-provider'
import { DataProvider } from "./types/base";

export const initDatabase = (provider: DataProvider): Required<DataProvider> => {
    return provider
}

export { createUpstashProvider, createMongoDataApiProvider }
export type { DataProvider }

