const {StatusCodes} = require('http-status-codes');
const { AppError } = require('../utils');
const { UserService } = require('../services');

function getAuthToken(req) {
    const rawToken = req.headers['x-access-token'] || req.headers['authorization'];
    if (!rawToken) {
        return null;
    }

    const jwtPattern = /([A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+)/;
    const match = rawToken.match(jwtPattern);
    if (match && match[1]) {
        return match[1];
    }

    if (rawToken.startsWith('Bearer ')) {
        return rawToken.slice(7).trim();
    }

    return rawToken.trim();
}


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

    next();
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

    next();
}

async function checkAuthentication(req, res, next) {
    try {
        const token = getAuthToken(req);
        const isAuthenticated = await UserService.isAuthenticated(token);
        if (!isAuthenticated) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                success: false,
                data: {},
                message: 'Invalid or expired token',
                error: {}
            });
        }
        req.user = isAuthenticated; // Attach the authenticated user to the request object
        next();
    } catch (error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            success: false,
            data: {},
            message: error.message || 'Invalid or expired token',
            error: {}
        });
    }
}
async function isAdmin(req,res,next){
    try{
        const user = await UserService.isAdmin(req.user.id);
        if(!user){
            return res.status(StatusCodes.FORBIDDEN).json({
                success: false,
                data: {},
                message: 'Access denied. Admins only.',
                error: {}
            });
        }
        next();
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            data: {},
            message: error.message || 'Internal server error',
            error: {}
        });
    }
}
module.exports = {
    authMiddleware,
    validateAuthRequest,
    checkAuthentication,
    isAdmin
}