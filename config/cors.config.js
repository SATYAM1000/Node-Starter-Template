import { envConfig } from './env.config.js'
import cors from 'cors'


export const configureCorsPolicy = (app) => {
    const allowedOrigins = envConfig.ENV === 'production' ? envConfig.ALLOWED_ORIGINS.split(',') : '*'
    const corsOptions = {
        origin: (origin, callback) => {
            if (allowedOrigins === '*') {
                callback(null, true)
            } else if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true)
            } else {
                callback(new Error('Not allowed by CORS'))
            }
        },
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: envConfig.ENV === 'production' ? true : false
    }

    app.use(cors(corsOptions))
}
