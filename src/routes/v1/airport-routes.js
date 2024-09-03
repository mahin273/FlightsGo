const express = require('express');

const {  AirportController } = require('../../controllers');
const { AirportMiddlewares } = require('../../middlewares')

const router = express.Router();
// /api/v1/airports POST
router.post('/',
    AirportMiddlewares.validateCreateRequest,
    AirportController.createAirport
);

router.get('/',
    AirportController.getAirports
);
router.get('/:id',
    AirportController.getAirport
);
router.delete('/:id',
    AirportController.destroyAirport
);
router.put('/:id',
    AirportMiddlewares.validateUpdateRequest,
    AirportController.updateAirport
);

router.patch('/:id',
    AirportMiddlewares.validatePatchRequest,
    AirportController.patchAirport
)
module.exports = router;
