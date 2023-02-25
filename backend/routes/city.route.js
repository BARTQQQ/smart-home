const express = require('express')
const router = express.Router()
const {getCity, updateCity} = require('../controllers/city.controller')
const {auth} = require('../middleware/auth')

router.route('/').get(auth, getCity).put(auth, updateCity)

module.exports = router