import { envConfig } from '../config/env.config.js'
import { logger } from '../config/logger.config.js'
import { responseMessages } from './messages.response.js'

export const httpError = (next, error, req, errorStatusCode = 500) => {
    const errorResponse = {
        success: false,
        statusCode: errorStatusCode,
        timestamp: new Date().toISOString(),
        correlationId: req.correlationId || null,
        request: {
            ip: req.ip,
            method: req.method,
            url: req.originalUrl
        },
        message: error instanceof Error ? error.message || responseMessages.INTERNAL_SERVER_ERROR : responseMessages.INTERNAL_SERVER_ERROR,
        data: null,
        trace: error instanceof Error ? error.stack : null
    }

    logger.error(`CONTROLLER_ERROR`, {
        meta: errorResponse
    })

    if (envConfig.ENV === 'production') {
        delete errorResponse.request.ip
        delete errorResponse.trace
        delete errorResponse.correlationId
        delete errorResponse.timestamp
    }

    return next(errorResponse)
}
