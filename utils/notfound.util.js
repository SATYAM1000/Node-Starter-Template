import { httpError } from '../responses/error.response.js'
import { responseMessages } from '../responses/messages.response.js'

export const routeNotFound = async (req, _res, next) => {
    try {
        throw new Error(responseMessages.NOT_FOUND('route'))
    } catch (error) {
        httpError(next, error, req, 404)
    }
}
