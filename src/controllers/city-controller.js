const { StatusCodes } = require('http-status-codes');
const { CityService } = require('../services');
const { SuccessResponse, ErrorResponse } = require('../utils/common');



/**
 * 
 * POST: /cities
 * req-body {name: 'London'}
 */

async function createCity(req, res) {
    try {

        const city = await CityService.createCity({
            name: req.body.name
        });
        SuccessResponse.data = city;
        return res
            .status(StatusCodes.CREATED)
            .json(SuccessResponse);

    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode)
            .json(ErrorResponse);
    }

}

/**
 * 
 * GET: /cities
 * req-body {}
 */

async function getcities(req,res) {
    try {
        const cities = await CityService.getCities();
        SuccessResponse.data = cities;
        return res
            .status(StatusCodes.OK)
            .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res
            .status(error.statusCode)
            .json(ErrorResponse)
    }
}

/**
 * 
 * GET: /airplanes/:id
 * req-body {}
 */

async function getCity(req, res) {
    try {
        const city = await CityController.getCity();
        SuccessResponse.data = city;
        return res
            .status(StatusCodes.Ok)
            .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error;
        return res
            .status(error.statusCode)
            .json(ErrorResponse);
        
    }
    
}



module.exports = {
    createCity,
    getcities,
    getCity
}