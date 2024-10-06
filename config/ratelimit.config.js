import rateLimit from 'express-rate-limit'
import { httpError } from '../responses/error.response.js'
import { responseMessages } from '../responses/messages.response.js'
import { envConfig } from './env.config.js'

export const rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: envConfig.MAX_ALLOWED_REQUESTS,
    handler: async (req, _res, next) => {
        try {
            throw new Error(responseMessages.TOO_MANY_REQUESTS)
        } catch (error) {
            httpError(next, error, req, 429)
        }
    }
})
