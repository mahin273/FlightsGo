const { StatusCodes } = require('http-status-codes');
const { FlightRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');
const { compareTime } = require('../utils/helpers/datetime-helper');
const {Op} = require('sequelize');


const flightRepository = new FlightRepository();

async function createFlight(data) {
    try {
        const { arrivalTime, departureTime } = data;

        if (!compareTime(arrivalTime, departureTime)) {
            throw new AppError('Arrival time must be greater than departure time', StatusCodes.BAD_REQUEST);
        }
        const flight = await flightRepository.create(data);
        return flight;
        
    } catch (error) {
        console.log(error)
        if (error.name == 'SequelizeValidationError') {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            
            throw new AppError(explanation,StatusCodes.BAD_REQUEST);
        }

        throw new AppError('Cannot create a new Flight object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAllFlights(query){
    let customFilter = {};
    let sortFilter = [];
    if (query.trips) {
       [departureAirportId, arrivalAirportId] = query.trips.split('-');
        customFilter.departureAirportId = departureAirportId;
        customFilter.arrivalAirportId = arrivalAirportId;
        if (departureAirportId === arrivalAirportId) {
            throw new AppError('Departure and arrival airports cannot be the same', StatusCodes.BAD_REQUEST);
        }
        
    }
    if (query.price) {
        [minPrice, maxPrice] = query.price.split('-');
        customFilter.price = {
            [Op.between]:[minPrice,(maxPrice==undefined)?2000000:maxPrice]
        }
    }
    if (query.travellers) {
        customFilter.totalseats = {
            [Op.gte]:query.travellers
        }
    }
     if (query.tripDate) {
        const startDate = new Date(query.tripDate);
        const endDate = new Date(query.tripDate);
        endDate.setHours(23, 59, 59, 999);
        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            throw new AppError('Invalid trip date format', StatusCodes.BAD_REQUEST);
        }
        customFilter.departureTime = {
            [Op.between]: [startDate, endDate]
        };
    }
       if (query.sort) {
        const params = query.sort.split(',');
           sortFilters = params.map((param) => param.split('_'));
           sortFilter = sortFilters
    }

    try {
        const flights = await flightRepository.getAllFlights(customFilter,sortFilter);
        return flights;
        
    } catch (error) {
        console.log(error);
        throw new AppError('Cannot fetch the data of all the flights', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createFlight,
    getAllFlights

} 
