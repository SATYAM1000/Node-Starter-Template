import { envConfig } from '../config/env.config.js'
import { logger } from '../config/logger.config.js'

export const httpResponse = (req, res, responseStatusCode, responseMessage, data = null) => {
    const response = {
        success: true,
        statusCode: responseStatusCode,
        correlationId: req.correlationId || null,
        timestamp: new Date().toISOString(),
        request: {
            ip: req.ip,
            method: req.method,
            url: req.originalUrl
        },
        message: responseMessage,
        data: data
    }

    logger.info(`CONTROLLER_RESPONSE`, {
        meta: response
    })

    if (envConfig.ENV === 'production') {
        delete response.request.ip
        delete response.correlationId
        delete response.timestamp
    }

    res.status(responseStatusCode).json(response)
}
