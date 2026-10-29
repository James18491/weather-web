const express = require('express')
const router = express.Router();
const {getWeatherData} = require('../controller/weatherController');

router.get('/',getWeatherData);
module.exports = router;
