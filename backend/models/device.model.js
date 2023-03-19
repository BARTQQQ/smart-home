const mongoose = require('mongoose')

const Schema = mongoose.Schema

const deviceSchema = new Schema({
    gpio: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    dusk: {
        type: Boolean,
        default: false
    },
    type: {
        type: String
    },
    state: {
        type: Boolean,
        default: false
    }
})

const Device = mongoose.model('Device', deviceSchema)

module.exports = Device





