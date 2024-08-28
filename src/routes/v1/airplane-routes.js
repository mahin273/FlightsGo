const express = require('express');

const { AirplaneController } = require('../../controllers');
const { AirplaneMiddelwares } = require('../../middlewares')

const router = express.Router();
// /api/v1/airplanes POST
router.post('/',
    AirplaneMiddelwares.validateCreateRequest,
    AirplaneController.createAirplane);

router.get('/',
    AirplaneController.getAirplanes
);

module.exports = router;
