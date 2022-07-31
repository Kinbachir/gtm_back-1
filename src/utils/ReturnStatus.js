export const returnStatus = (res, statusCode, successCode, data, message) => {
    return res.status(statusCode).send({
        succes: successCode,
        message: message,
        data: data
    })
}