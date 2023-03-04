const express = require('express')
const router = express.Router()
const {registerUser, loginUser, getUser, emailVerify, getUsers, deleteUser, updateUser} = require('../controllers/user.controller')
const {auth} = require('../middleware/auth')

router.post('/', loginUser)
router.delete('/:id', auth, deleteUser)
router.get('/account', auth, getUser)
router.post('/register', auth, registerUser)
router.post('/emailVerify/:nickname/:emailToken', emailVerify)
router.get('/accounts', auth, getUsers)
router.put('/:id', auth, updateUser)

module.exports = router