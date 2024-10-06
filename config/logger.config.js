import 'winston-mongodb'
import 'winston-daily-rotate-file'
import path from 'path'
import { fileURLToPath } from 'url'
import util from 'util'

import { createLogger, format, transports } from 'winston'
import { red, blue, yellow, green, magenta } from 'colorette'
import { envConfig } from './env.config.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const colorizeLevel = (level) => {
    switch (level) {
        case 'ERROR':
            return red(level)
        case 'INFO':
            return blue(level)
        case 'WARN':
            return yellow(level)
        default:
            return level
    }
}

const sanitizeMeta = (meta) => {
    if (meta.password) meta.password = '******'
    if (meta.token) meta.token = '******'
    return meta
}

const consoleLogFormat = format.printf((info) => {
    const { level, message, timestamp, meta = {} } = info
    const customLevel = colorizeLevel(level.toUpperCase())
    const customTimestamp = green(timestamp)
    const customMessage = magenta(message)

    const sanitizedMeta = sanitizeMeta(meta)
    const customMeta = util.inspect(sanitizedMeta, { showHidden: false, colors: true, depth: 1 })
    const customLog = `${customLevel} [${customTimestamp}] ${customMessage}\n${magenta('META')} ${customMeta}\n`

    return customLog
})

const consoleTransport = () => {
    if (envConfig.ENV === 'development') {
        return [
            new transports.Console({
                level: 'info',
                format: format.combine(format.timestamp(), consoleLogFormat)
            })
        ]
    }
    return []
}

const fileLogFormat = format.printf((info) => {
    const { level, message, timestamp, meta = {} } = info
    const logMeta = {}

    const sanitizedMeta = sanitizeMeta(meta)

    for (const [key, value] of Object.entries(sanitizedMeta)) {
        if (value instanceof Error) {
            logMeta[key] = {
                name: value.name,
                message: value.message,
                trace: value.stack || ''
            }
        } else {
            logMeta[key] = value
        }
    }

    const logData = {
        level: level.toUpperCase(),
        message,
        timestamp,
        meta: logMeta
    }

    return JSON.stringify(logData, null, 4)
})

const fileTransport = () => {
    return [
        new transports.DailyRotateFile({
            filename: path.join(__dirname, '../', 'logs', `${envConfig.ENV}-%DATE%.log`),
            datePattern: 'YYYY-MM-DD',
            level: 'info',
            maxSize: '20m',
            maxFiles: '10d',
            format: format.combine(format.timestamp(), fileLogFormat)
        })
    ]
}

const MongodbTransport = () => {
    return [
        new transports.MongoDB({
            level: 'info',
            db: envConfig.DATABASE_URL,
            metaKey: 'meta',
            expireAfterSeconds: 3600 * 24 * 30,
            collection: 'application-logs'
        })
    ]
}

export const logger = createLogger({
    defaultMeta: {
        meta: {}
    },
    transports: [...fileTransport(), ...MongodbTransport(), ...consoleTransport()]
})
