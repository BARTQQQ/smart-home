const City = require('../models/city.model')

const getCity = async (req, res) => {
    try {
        const city = await City.findOne()
        if (!city) {
          res.status(404).json({ error: 'City not found' })
        } else {
          res.status(200).json(city);
        }
      } catch (error) {
        res.status(500).json({ error: 'Server error' })
      }
}

const updateCity = async (req, res) => {
    try {
        const {city} = req.body
        const updatedCity = await City.findOneAndUpdate({}, { city: city }, { new: true, upsert: true })
        if (!updatedCity) {
          res.status(404).json({ error: 'City not found' })
        } else {
          res.status(200).json(updatedCity);
        }
      } catch (error) {
        res.status(500).json({ error: error.message })
      }
}

module.exports = {getCity, updateCity}