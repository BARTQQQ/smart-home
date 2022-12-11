const express = require('express')
const router = express.Router()
const {getEvents, createEvent, deleteEvent} = require('../controllers/event.controller')
const {auth} = require('../middleware/auth')

router.route('/').get(auth, getEvents).post(auth, createEvent)
router.route('/:id').delete(auth, deleteEvent)


module.exports = router