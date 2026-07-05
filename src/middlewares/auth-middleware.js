const {StatusCodes} = require('http-status-codes');
const { AppError } = require('../utils');
const { UserService } = require('../services');


function authMiddleware(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            success: false,
            data: {},
            message: 'Authorization header missing',
            error: {}
        });
    }
}

function validateAuthRequest(req, res, next) {
    const { email, password } = req.body;
    if (!email){
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            data: {},   
            message: 'Email is required',
            error: {}
        }); 
    }

    if (!password){
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            data: {},   
            message: 'Password is required',
            error: {}
        }); 
    }
}

module.exports = {
    authMiddleware,
    validateAuthRequest
}