class errorResponse extends Error {
    constructor(message, statusCode) {
        statusCode = statusCode;
    }
}
module.exports = errorResponse;