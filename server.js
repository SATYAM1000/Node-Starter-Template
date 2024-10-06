import { envConfig } from './config/env.config.js'
import { connectToDB } from './config/db.config.js'
import { logger } from './config/logger.config.js'

export const startServer = (app) => {
    const server = app.listen(envConfig.PORT)

    ;(async () => {
        try {
            const connection = await connectToDB()
            logger.info('DATABASE_CONNECTION', {
                meta: {
                    CONNECTION_NAME: connection.name,
                    HOST: connection.host,
                    PORT: connection.port
                }
            })

            logger.info('APPLICATION_STARTED', {
                meta: {
                    PORT: envConfig.PORT,
                    SERVER_URL: envConfig.SERVER_BASE_URL
                }
            })
        } catch (err) {
            logger.error('APPLICATION_ERROR', { meta: err })

            server.close((error) => {
                if (error) {
                    logger.error('SERVER_SHUTDOWN_ERROR', { meta: error })
                }
                process.exit(1)
            })
        }

        // Graceful shutdown on SIGTERM or SIGINT
        process.on('SIGTERM', () => shutdown(server))
        process.on('SIGINT', () => shutdown(server))
    })()

    const shutdown = (server) => {
        logger.info('Gracefully shutting down')
        server.close(() => {
            logger.info('Server has been shut down')
            process.exit(0)
        })
    }
}
