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

async function signIn(req, res) {
    try {
        const token = await UserService.signIn({
            email: req.body.email,
            password: req.body.password
        });
        return res.status(StatusCodes.OK).json({
            success: true,
            data: { token },
            message: 'Successfully signed in',
            error: {}
        });
    }
    catch (error) {
        console.log(error);
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            data: {},
            message: error.message || 'Something went wrong while signing in',
            error: {}
        });
    }
}

async function AddRoleToUser(req, res) {
    try {
        const user = await UserService.addRoleToUser({
            userId: req.body.userId,
            role: req.body.role
        });
        return res.status(StatusCodes.OK).json({
            success: true,
            data: { user },
            message: 'Role added to user successfully',
            error: {}
        });
    }
    catch (error) {
        console.log(error);
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            data: {},
            message: error.message || 'Something went wrong while adding role to user',
            error: {}
        });
    }
}



module.exports = {
    createUser,
    signIn,
    AddRoleToUser
}