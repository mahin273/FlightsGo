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
    const errors = [];

    if (!req.params.id) {
        errors.push('ID not found in the request parameters');
    }

    if (!req.body.modelNumber) {
        errors.push('Model Number not found in the request body');
    }

    if (errors.length > 0) {
        ErrorResponse.message = "Validation error";
        ErrorResponse.error = new AppError(errors, StatusCodes.BAD_REQUEST);
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }

    next();
}

function validatePatchRequest(req, res, next) {
    const errors = [];

    if (!req.params.id) {
        errors.push('ID not found in the request parameters');
    }

   
    if (req.body.modelNumber && typeof req.body.modelNumber !== 'string') {
        errors.push('Invalid model number format');
    }

    if (req.body.capacity && (isNaN(req.body.capacity) || typeof +req.body.capacity !== 'number')) {
        errors.push('Invalid capacity format');
    }

    if (errors.length > 0) {
        ErrorResponse.message = "Validation error";
        ErrorResponse.error = new AppError(errors, StatusCodes.BAD_REQUEST);
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }

    next();
}


module.exports = {
    validateCreateRequest,
    validateUpdateRequest,
    validatePatchRequest
}  