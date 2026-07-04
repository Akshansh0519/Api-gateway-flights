const { AirplaneRepository } = require('../repositories');
    const { AppError, StatusCodes } = require('../utils');

const airplaneRepository = new AirplaneRepository();

async function createAirplane(data){
    try{
        const response = await airplaneRepository.create(data);
        return response;
    }
    catch(error){
        if(error.name === 'SequelizeValidationError'){
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError('Validation error: ' + explanation.join(', '), StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Error creating airplane object: ' + error.message, StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirplanes(){
    try{
        const response = await airplaneRepository.getAll();
        return response;
    }
    catch(error){
        throw new AppError('Error fetching airplane objects: ' + error.message, StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirplane(id){
    try{
        const response = await airplaneRepository.get({id});
        return response;
    }
    catch(error){
        if(error.statusCodes == StatusCodes.NOT_FOUND){
            throw new AppError('Airplane not found', StatusCodes.NOT_FOUND);
        }
        throw new AppError('Error fetching airplane objects: ' + error.message, StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createAirplane,
    getAirplanes,
    getAirplane
}   
