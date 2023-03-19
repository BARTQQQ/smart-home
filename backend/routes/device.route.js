const express = require('express')
const router = express.Router()
const {createDevice, getDevices, deleteDevice, setState, getTemp, getHumidity} = require('../controllers/device.controller')
const {auth} = require('../middleware/auth')

router.route('/').get(auth, getDevices).post(auth, createDevice)
router.route('/:id').delete(auth, deleteDevice)
router.route('/set').post(auth, setState)
router.route('/temp').get(auth, getTemp)
router.route('/humidity').get(auth, getHumidity)

module.exports = router
