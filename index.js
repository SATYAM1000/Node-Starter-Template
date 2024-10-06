import express from 'express'
import helmet from 'helmet'
import hpp from 'hpp'
import mongoSanitize from 'express-mongo-sanitize'
import compression from 'compression'
import cookieParser from 'cookie-parser'

import { envConfig } from './config/env.config.js'
import { correlationIdMiddleware } from './middlewares/correlationId.middleware.js'

import { globalErrorHandler } from './middlewares/error.middleware.js'
import { routeNotFound } from './utils/notfound.util.js'

import { rateLimiter } from './config/ratelimit.config.js'
import { startServer } from './server.js'
import { testRouter } from './routes/test.route.js'
import { configureCorsPolicy } from './config/cors.config.js'

const app = express()

if (envConfig.ENV === 'production') {
    app.set('trust proxy', 1)
}

app.use(helmet()) 

configureCorsPolicy(app) 

app.use(rateLimiter) // Prevent excessive requests
app.use(hpp()) // Prevent HTTP parameter pollution
app.use(mongoSanitize()) // Sanitize requests against MongoDB injection
app.use(express.json()) // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })) // Parse URL-encoded request bodies
app.use(cookieParser()) // Parse cookies
app.use(compression()) // Compress responses for performance

app.use(correlationIdMiddleware) // Handle correlation ID tracking

// Routes
app.use('/api/v1', testRouter)

// 404 route handler
app.use(routeNotFound)

// Global error handler
app.use(globalErrorHandler)

startServer(app)
