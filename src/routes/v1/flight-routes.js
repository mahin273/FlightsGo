const express = require('express');

const {  FlightController } = require('../../controllers');
const {FlightMiddlewares } = require('../../middlewares')

const router = express.Router();
// /api/v1/flights POST
router.post('/',
    FlightMiddlewares.validateCreateRequest,
    FlightController.createFlight
);

router.get('/',
   
    FlightController.getAllFlights
);
// /api/v1/flights/:id --get
router.get('/:id',
    FlightController.getFlight
    );
// /api/v1/flights/:id/seats  --Patch
router.patch('/:id/seats',
   FlightMiddlewares.validateUpdateSeatsRequest,
    FlightController.updateSeats
);


module.exports = router;
