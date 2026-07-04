const { StatusCodes } = require('http-status-codes');
const { compareTime } = require('./helpers/date-time-helpers');

const ENUMS = require('./Enums');

class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

module.exports = {
    AppError,
    StatusCodes,
    compareTime,
    ENUMS
}