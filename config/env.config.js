import dotenvFlow from 'dotenv-flow'

dotenvFlow.config()

export const envConfig = {
    ENV: process.env.ENV,
    PORT: process.env.PORT,
    DATABASE_URL: process.env.DATABASE_URL,
    ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS,
    MAX_ALLOWED_REQUESTS: process.env.MAX_ALLOWED_REQUESTS,
    SERVER_BASE_URL: process.env.SERVER_BASE_URL
}
