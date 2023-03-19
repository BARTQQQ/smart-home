const Device = require('../models/device.model')
const Temp = require('../models/temperature.model')
const Humidity = require('../models/humidity.model')

// @desc add new user
// @route POST /api/user/add
const createDevice = async (req, res) => {

    try {
        const { gpio, name, type } = req.body
    
        const deviceGpio = await Device.findOne({gpio})
    
        if (deviceGpio) {
            return res.status(400).json({errors: 'Podany pin jest zajęty'})
        }
    
        const user = new Device({ gpio, name, type })
        await user.save()
    
        res.status(201).json({ message: 'Pomyślnie dodano' })
    } catch (error) {
        return res.status(400).json(error.message)
    }
}

const getDevices = async (req, res) => {
    const devices = await Device.find()
    return res.status(200).json(devices)
}

const getTemp = async (req, res) => {
    const temps = await Temp.find().sort({createdAt: -1}).limit(1440);
    return res.status(201).json(temps)
}

const getHumidity = async (req, res) => {
    const humidities = await Humidity.find().sort({createdAt: -1}).limit(1440);
    return res.status(201).json(humidities)
}

const setState = async (req, res) => {
    const {stateString, gpio} = req.body 
    const device = await Device.findOne({gpio: gpio})

    if (!device) {
      return res.status(404).json({ message: 'Nie znaleziono' })
    }
    
    if(stateString === 'true') {
        device.state = true
    }
    
    
    if(stateString === 'false') {
        device.state = false
    }

    await device.save()
    
    return res.status(200).json(device)
}

const deleteDevice = async (req, res) => {
    try {
      const device = await Device.findById(req.params.id)
    
      if(!device) {
          return res.status(400).json({message: 'Nie ma takiego urządzenia'})
      }
    
      await device.remove()
    
      res.status(200).json({id: req.params.id})
    } catch(error) {
      return res.json(error.message)
    }
  }
  
module.exports = {createDevice, getDevices, deleteDevice, setState, getTemp, getHumidity}
