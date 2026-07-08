const UserRepository = require('../repositories/user-repository');
const Auth = require('../utils/auth');
const ENUMS = require('../utils/Enums');
const bcrypt = require('bcrypt');
const userRepository = new UserRepository();
const RoleRepository = require('../repositories/role-repository');
const roleRepository = new RoleRepository();
const { StatusCodes, AppError } = require('../utils');

async function createUser(data){
    try{
        const user = await userRepository.create(data);
        const role = await roleRepository.getRoleByName(ENUMS.USER_ROLE_ENUMS.CUSTOMER);
        if(!role){
            throw new AppError('Role not found', StatusCodes.NOT_FOUND);
        }
        await user.addRole(role);
        return user;
    }catch(error){
        if (error instanceof AppError) {
            throw error;
        }
        if(error.name == 'SequelizeValidationError'){
            const errorMessages = error.errors.map(err => err.message).join(', ');
            throw new AppError(errorMessages, StatusCodes.BAD_REQUEST);
        }
        if (error.name === 'SequelizeUniqueConstraintError') {
            const errorMessages = error.errors.map(err => err.message).join(', ');
            throw new AppError(errorMessages || 'User already exists', StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new user', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function signIn(data) {
    try {
        const user = await userRepository.getUserByEmail(data.email);
        if (!user) {
            throw new AppError('Invalid email , No such user exists',StatusCodes.UNAUTHORIZED);
        }
        const checkPassword = await bcrypt.compare( data.password, user.password); 
        if (!checkPassword) {
            throw new AppError( 'Incorrect password', StatusCodes.UNAUTHORIZED);
        }
        
        const jwt = Auth.createToken({ id: user.id, email: user.email });
        return jwt;
    } catch (error) {
        if (error instanceof AppError) {
            throw error;
        }
        throw new AppError('Cannot sign in', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function isAuthenticated(token) {
    try {
        if (!token) {
            throw new AppError('Token is missing', StatusCodes.UNAUTHORIZED);
        }
        const decoded = Auth.verifyToken(token);
        const user = await userRepository.getUserById(decoded.id);
        if (!user) {
            throw new AppError('User not found', StatusCodes.NOT_FOUND);
        }
        return user;
    } catch (error) {
        if (error instanceof AppError) {
            throw error;
        }
        throw new AppError('Invalid or expired JWT token', StatusCodes.UNAUTHORIZED);
    }
}

module.exports = {
    createUser,
    signIn,
    isAuthenticated
}