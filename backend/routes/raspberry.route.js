const express = require('express')
const router = express.Router()
const {toggleLED, tempSensor, duskSensor} = require('../controllers/raspberry.controller')
const {auth} = require('../middleware/auth')

router.get('/temperature', tempSensor)
router.post('/', toggleLED)
router.post('/dusk', duskSensor)

module.exports = router
