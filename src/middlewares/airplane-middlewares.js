const { StatusCodes } = require('http-status-codes');
const { ErrorResponse } = require('../utils/common');
const AppError = require('../utils/errors/app-error');
function validateCreateRequest(req, res, next) {
    if (!req.body.modelNumber) {
        ErrorResponse.message = "something went wrong while creating airplane";
        
        ErrorResponse.error = new AppError(['Model Number not found in this upcoming request'], StatusCodes.BAD_REQUEST);
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }
    next();
}

function validateUpdateRequest(req, res, next) {
    if (!req.params.id) {
        ErrorResponse.message = "something went wrong while updating airplane";

        ErrorResponse.error = new AppError(['ID not found in this upcoming request'], StatusCodes.BAD_REQUEST);
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }
    if (!req.body.modelNumber) {
        ErrorResponse.message = "something went wrong while updating airplane";

        ErrorResponse.error = new AppError(['Model Number not found in this upcoming request'], StatusCodes.BAD_REQUEST);
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }
    
    next();
}

module.exports = {
    validateCreateRequest,
    validateUpdateRequest
}  