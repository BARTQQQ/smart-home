const express = require('express')
const router = express.Router()
const {createDevice, getDevices, deleteDevice} = require('../controllers/device.controller')
const {auth} = require('../middleware/auth')

router.route('/').get(auth, getDevices).post(auth, createDevice)
router.route('/:id').delete(auth, deleteDevice)

module.exports = router