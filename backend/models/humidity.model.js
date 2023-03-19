const mongoose = require('mongoose')

const Schema = mongoose.Schema

const humiditySchema = new Schema({
    humidity: {
        type: Number,
        required: true
    }
}, {
	timestamps: true
	})

const Humidity = mongoose.model('Humidity', humiditySchema)

module.exports = Humidity
