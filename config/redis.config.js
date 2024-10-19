import redis from 'redis'
import envConfig from './env.config.js'

let client = null

export const connectToRedis = async () => {
    try {
        if (!client) {
            client = redis.createClient({
                url: envConfig.REDIS_URL
            })

            client.on('error', (error) => {
                throw error
            })

            await client.connect()
        }

        return client
    } catch (error) {
        throw new Error(error)
    }
}
