import express from 'express'
import { httpError } from '../responses/error.response.js'
import { httpResponse } from '../responses/success.response.js'

export const testRouter = express.Router()

testRouter.get('/test', async (req, res, next) => {
    try {
        httpResponse(req, res, 200, 'Hello world', null)
    } catch (error) {
        httpError(next, error, req, 500)
    }
})
