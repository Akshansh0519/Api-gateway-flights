const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');

const { AppError } = require('./index');
const { JWT_SECRET_KEY, JWT_EXPIRATION } = require('../config/server-config');

function createToken(user) {
    try {
        const payload = { id: user.id, email: user.email };
        const token = jwt.sign(
            payload, 
            JWT_SECRET_KEY, 
            { 
                expiresIn: JWT_EXPIRATION 
            }
        );
        return token;
    } catch (error) {
        throw new AppError('Cannot create token', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, JWT_SECRET_KEY);
        return decoded;
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            throw new AppError('JWT token has expired', StatusCodes.UNAUTHORIZED);
        }
        throw new AppError('Invalid token', StatusCodes.UNAUTHORIZED);
    }
} 

module.exports = {
    createToken,
    verifyToken
};