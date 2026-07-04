const UserRepository = require('../repositories/user-repository');

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

module.exports = {
    createUser
}