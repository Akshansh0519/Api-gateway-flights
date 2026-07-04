const { UserService } = require('../services');

const { StatusCodes, AppError } = require('../utils');

/*
* POST : /signup
* rq-body : {email, password}
*
*/
async function createUser(req,res){
    try{
        const user = await UserService.createUser({
            email : req.body.email,
            password : req.body.password
        });
        return res.status(StatusCodes.CREATED).json({   
            success: true,
            data: user, 
            message: 'Successfully created a user',
            error: {}
        });
    }
    catch(error){
        let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
        let errorMessage = 'Something went wrong while creating a user';
        
        if(error instanceof AppError) {
            statusCode = error.statusCode;
            errorMessage = error.message;
        } else if(error.message) {
            errorMessage = error.message;
        }
        
        return res.status(statusCode).json({
            success: false,
            data: {},
            message: errorMessage,
            error: {}
        });
    }
}

// async function getCities(req,res){
//     try{
//         const cities = await CityService.getCities();
//         return res.status(StatusCodes.OK).json({
//             success: true,
//             data: cities,
//             message: 'Successfully fetched cities',
//             error: {}
//         });
//     }
//     catch(error){
//         let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
//         if(error instanceof AppError) {
//             statusCode = error.statusCode;
//         }
//         return res.status(statusCode).json({
//             success: false,
//             data: {},
//             message: error.message || 'Something went wrong while fetching airplanes',
//             error: error 
//         });
//     }
// }

// async function getCity(req,res){
//     try{
//         const city = await CityService.getCity(req.params.id);
//         if(!city){
//             throw new AppError('City not found', StatusCodes.NOT_FOUND);
//         }
//         else{
//             return res.status(StatusCodes.OK).json({
//                 success: true,
//                 data: city,
//                 message: 'Successfully fetched the city',
//                 error: {}
//             });
//         }
//     }
//     catch(error){
//         let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
//         if(error instanceof AppError) {
//             statusCode = error.statusCode;
//         }
//         return res.status(statusCode).json({
//             success: false,
//             data: {},
//             message: error.message || 'Something went wrong while fetching the airplane',
//             error: error 
//         });
//     }
// }

// async function destroyCity(req,res){
//     try{
//         const response = await CityService.destroyCity(req.params.id);
//         return res.status(StatusCodes.OK).json({
//             success: true,
//             data: response,
//             message: 'Successfully destroyed the city',
//             error: {}
//         });
//     }
//     catch(error){
//         let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
//         if(error instanceof AppError) {
//             statusCode = error.statusCode;
//         }
//         return res.status(statusCode).json({
//             success: false,
//             data: {},
//             message: error.message || 'Something went wrong while destroying the airplane',
//             error: error 
//         });
//     }
// }

// async function updateCity(req,res){
//     try{
//         const response = await CityService.updateCity(req.params.id, req.body);
//         return res.status(StatusCodes.OK).json({
//             success: true,
//             data: response,
//             message: 'Successfully updated the city',
//             error: {}
//         });
//     }
//     catch(error){
//         let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
//         if(error instanceof AppError) {
//             statusCode = error.statusCode;
//         }
//         return res.status(statusCode).json({
//             success: false,
//             data: {},
//             message: error.message || 'Something went wrong while updating the airplane',
//             error: error 
//         });
//     }
// }

// async function putCity(req,res){
//     try{
//         const response = await CityService.putCity(req.params.id, req.body);
//         return res.status(StatusCodes.OK).json({
//             success: true,
//             data: response,
//             message: 'Successfully updated the city',
//             error: {}
//         });
//     }
//     catch(error){
//         let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
//         if(error instanceof AppError) {
//             statusCode = error.statusCode;
//         }
//         return res.status(statusCode).json({
//             success: false,
//             data: {},
//             message: error.message || 'Something went wrong while updating the airplane',
//             error: error
//         });
//     }
// }

module.exports = {
    createUser,
    // getCities,
    // getCity,
    // destroyCity,
    // updateCity,
    // putCity
}