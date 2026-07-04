const router = require('express').Router();

const { AirplaneController } = require('../../controllers');

const { AirplaneMiddleware } = require('../../middlewares');


// /api/v1/airplanes POST 
router.post('/', AirplaneMiddleware.validateAirplane, AirplaneController.createAirplane);

// /api/v1/airplanes/:id GET
router.get('/', AirplaneController.getAirplanes);
router.get('/:id', AirplaneController.getAirplane);

module.exports = router;