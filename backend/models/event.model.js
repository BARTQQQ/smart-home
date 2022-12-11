const mongoose = require('mongoose')

const Schema = mongoose.Schema

const eventSchema = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    user: {
        type: String
    },
    date: {
        type: String
    },
    contents: {
        type: String
    }
}, {
    timestamps: true
})

const Event = mongoose.model('Event', eventSchema)

module.exports = Event