const Device = require('../models/device.model')

// @desc add new user
// @route POST /api/user/add
const createDevice = async (req, res) => {

    try {
        const { gpio, name, dusk } = req.body
        console.log(dusk)
    
        const deviceGpio = await Device.findOne({gpio})
    
        if (deviceGpio) {
            return res.status(400).json({errors: 'Podany pin jest zajęty'})
        }
    
        const user = new Device({ gpio, name, dusk })
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
  
module.exports = {createDevice, getDevices, deleteDevice}