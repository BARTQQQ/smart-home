const Event = require('../models/event.model')

// @desc Get events
// @route GET /api/events
const getEvents = async (req, res) => {
    const events = await Event.find()

    res.status(200).json(events)
}

// @desc create new event
// @route POST /api/events/create
const createEvent = async (req, res) => {
    const {date, contents} = req.body

    console.log(req.user)

    const userID = req.user.id.toString()
    const userNickname = req.user.nickname.toString()
    
    const event = await Event.create({
        userID: userID,
        user: userNickname,
        date: date,
        contents: contents,
        })

    if(event){
        return res.status(200).json(event)
    }
}

const deleteEvent = async (req, res) => {
    const event = await Event.findById(req.params.id)
    
    if(!event) {
        return res.status(400).json({errors: 'Event not found'})
    }

    await event.remove()

    res.status(200).json({ id: req.params.id })
}


module.exports = {getEvents, createEvent, deleteEvent}