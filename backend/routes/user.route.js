const express = require('express')
const router = express.Router()
const {registerUser, loginUser, getUser} = require('../controllers/user.controller')
const {auth} = require('../middleware/auth')

router.post('/', loginUser)
router.get('/account', auth, getUser)
router.post('/register', registerUser)

module.exports = router