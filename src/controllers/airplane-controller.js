const  { AirplaneService }  = require('../services');
const { StatusCodes, AppError } = require('../utils');
/*
    POST : /airplanes
    req-body {modelNumber:'airbus-320', capacity:200}
*/
async function createAirplane(req,res){
    try{
        const airplane = await AirplaneService.createAirplane({
            modelNumber : req.body.modelNumber, 
            capacity : req.body.capacity
        });
        return res.status(StatusCodes.CREATED).json({   
            success: true,
            data: airplane, 
            message: 'Successfully created an airplane',
            error: {}
        });
    }
    catch(error){
        let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
        if(error instanceof AppError) {
            statusCode = error.statusCode;
        }
        return res.status(statusCode).json({
            success: false,
            data: {},
            message: error.message || 'Something went wrong while creating an airplane',
            error: error 
        });
    }
}

async function getAirplanes(req,res){
    try{
        const airplane = await AirplaneService.getAirplanes();
        return res.status(StatusCodes.OK).json({
            success: true,
            data: airplane,
            message: 'Successfully fetched airplanes',
            error: {}
        });
    }
    catch(error){
        let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
        if(error instanceof AppError) {
            statusCode = error.statusCode;
        }
        return res.status(statusCode).json({
            success: false,
            data: {},
            message: error.message || 'Something went wrong while fetching airplanes',
            error: error 
        });
    }
}

async function getAirplane(req,res){
    try{
        const airplane = await AirplaneService.getAirplane(req.params.id);
        if(!airplane){
            throw new AppError('Airplane not found', StatusCodes.NOT_FOUND);
        }
        else{
            return res.status(StatusCodes.OK).json({
                success: true,
                data: airplane,
                message: 'Successfully fetched the airplane',
                error: {}
            });
        }
    }
    catch(error){
        let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
        if(error instanceof AppError) {
            statusCode = error.statusCode;
        }
        return res.status(statusCode).json({
            success: false,
            data: {},
            message: error.message || 'Something went wrong while fetching the airplane',
            error: error 
        });
    }
}

module.exports = {
    createAirplane,
    getAirplanes,
    getAirplane
}