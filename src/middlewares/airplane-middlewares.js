const { StatusCodes } = require('http-status-codes');
const { ErrorResponse } = require('../utils/common');
function validateCreateRequest(req, res, next) {
    if (!req.body.modelNumber) {
        ErrorResponse.message = "something went wrong while creating airplane";
        ErrorResponse.error = { Explanation: 'Model Number not found in this upcoming request' };
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }
    next();
}

module.exports = {
    validateCreateRequest
} 