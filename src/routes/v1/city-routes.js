const express = require('express');

const { CityController } = require('../../controllers');
const { CityMiddlewares } = require('../../middlewares')

const router = express.Router();

// /api/v1/cities POST
router.post('/',
    CityMiddlewares.validateCreateRequest,
    CityController.createCity
);

// /api/v1/cities GET

router.get('/',
    CityController.getcities
)

// /api/v1/cities/id GET
router.get('/:id',
    CityController.getCity
)

// /api/v1/cities/id DELTE
router.delete('/:id',
    CityController.destroyCity
)


module.exports = router;  