const UserRepository = require('../repositories/user-repository');
const Auth = require('../utils/auth');
const bcrypt = require('bcrypt');
const userRepository = new UserRepository();
const { StatusCodes, AppError } = require('../utils');

async function createUser(data){
    try{
        const user = await userRepository.create(data);
        return user;
    }catch(error){
        if(error.name == 'SequelizeValidationError'){
            const errorMessages = error.errors.map(err => err.message).join(', ');
            throw new AppError(errorMessages, StatusCodes.BAD_REQUEST);
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

module.exports = {
    createUser,
    signIn
}