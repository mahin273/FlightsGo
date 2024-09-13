const CrudRepository = require('./crud-repository');
const { Flight, Airplane, Airport,City } = require('../models');
const{Sequelize}= require('sequelize');
const db=require('../models');
const {addRowLockOnFlights}= require('./queries')
class FlightRepository extends CrudRepository {
    constructor() {
        super(Flight);
    }
 async getAllFlights(filter, sort) {
        const response = await Flight.findAll({
            where: filter,
            order: sort,
            include: [
                {
                    model: Airplane,
                    as:'airplaneDetail',
                    require:true
            },
                {
                    model: Airport,
                    as: 'departureAirport', 
                    required: true,
                    include: [
                        {
                            model: City,
                            as: 'city',
                            require: true,
                            attributes: ['name']
                        }
                    ],
                    on: {
                        col1: Sequelize.where(Sequelize.col("Flight.departureAirportId"), "=", Sequelize.col("departureAirport.code"))

                    }
                },
                {
                    model: Airport,
                    as: 'arrivalAirport',
                    required: true,
                       include: [
                        {
                            model: City,
                            as: 'city',
                               require: true,
                               attributes: ['name']
                        }
                    ],
                       
                   on: {
                        col1: Sequelize.where(Sequelize.col("Flight.arrivalAirportId"),"=",Sequelize.col("arrivalAirport.code"))
                    }
                }
            ]
        });
        return response;
    }

    async updateRemainingSeats(flightId,seats,dec = true){
        await db.sequelize.query(addRowLockOnFlights(flightId));
        const flight = await Flight.findByPk(flightId)
        if(parseInt(+dec)){
             await flight.decrement('totalSeats',{by:seats});

        }else{
            await flight.increment('totalSeats',{by:seats});

        }
        return flight;
    }
}

module.exports = FlightRepository;