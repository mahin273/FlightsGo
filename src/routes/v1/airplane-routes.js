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
router.get('/:id',
    AirplaneController.getAirplane
);
router.delete('/:id',
    AirplaneController.destroyAirplane
);
router.put('/:id',
    AirplaneMiddelwares.validateUpdateRequest,
    AirplaneController.updateAirplane
);
module.exports = router;
