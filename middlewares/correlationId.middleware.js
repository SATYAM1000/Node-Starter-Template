import { v4 as uuidv4 } from 'uuid';

// for tracking requests
export const correlationIdMiddleware = (req, res, next) => {
    const correlationId = req.headers['x-correlation-id'] || uuidv4()
    req.correlationId = correlationId
    res.setHeader('X-Correlation-ID', correlationId)
    next()
}
