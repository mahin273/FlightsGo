const { StatusCodes } = require('http-status-codes');
const { ErrorResponse } = require('../utils/common');
const AppError = require('../utils/errors/app-error');
function validateCreateRequest(req, res, next) {
    if (!req.body.name) {
        ErrorResponse.message = "something went wrong while creating airport";
        
        ErrorResponse.error = new AppError(['Name  not found in this upcoming request'], StatusCodes.BAD_REQUEST);
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }
        if (!req.body.code) {
        ErrorResponse.message = "something went wrong while creating airport";
        
        ErrorResponse.error = new AppError(['Airport code not found in this upcoming request'], StatusCodes.BAD_REQUEST);
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }
        if (!req.body.cityId) {
        ErrorResponse.message = "something went wrong while creating airport";
        
        ErrorResponse.error = new AppError(['City Id not found in this upcoming request'], StatusCodes.BAD_REQUEST);
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

    if (!req.body.name) {
        errors.push('Name not found in the request body');
    }
    if (!req.body.code) {
        errors.push('Code not found in the request body');
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

   
    if (req.body.name && typeof req.body.name !== 'string') {
        errors.push('Invalid model number format');
    }

    if (req.body.code && typeof req.body.code !== 'string') {
        errors.push('Invalid  code format');
    }
    if (req.body.cityId && (isNaN(req.body.capacity) || typeof +req.body.cityId !== 'number')) {
        errors.push('Invalid City Id format');
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