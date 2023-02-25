const mongoose = require('mongoose')

const Schema = mongoose.Schema

const citySchema = new Schema({
    city: {
        type: String
    }
})

const defaultCity = { city: '' }

const City = mongoose.model('City', citySchema)

module.exports = City

City.findOne((err, city) => {
    if (!city) {
    City.create(defaultCity)
}
})






