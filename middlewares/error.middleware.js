export const globalErrorHandler = (err, _req, res, _next) => {
     return res.status(err.statusCode).json(err)
}
