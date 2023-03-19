const Gpio = require('pigpio').Gpio;
const i2c = require('i2c-bus');
const Temp = require('../models/temperature.model')
const Humidity = require('../models/humidity.model')
const Device = require('../models/device.model')
const dht11 = require('node-dht-sensor');
const {notifyHighTemp} = require('../services/email.service')

//0x40 fotorezystor
//0x41 temperatura
//0x42 potencjometr

// i2c settings
const busNubmer = 1;
const PCF8591T_ADDRESS = 0x48;

const i2c1 = i2c.openSync(busNubmer);

let lastEmitTime = 0
let lastNotifyTime = 0
let lastSaveTime = 0

const toggleLED = (pin) => {
  try {
    const LED = new Gpio(pin, { mode: Gpio.OUTPUT });
    const currentValue = LED.digitalRead();

    LED.digitalWrite(currentValue === 0 ? 1 : 0);
  } catch(err) {
    console.log(err)
  }
}

const toggleServo = (pin, state) => {
  try {
	const motor = new Gpio(pin, {mode: Gpio.OUTPUT});

    let pulseWidth = 1000;

    if (state) {
      pulseWidth = 1000;
    } else {
      pulseWidth = 2000;
    }
    motor.servoWrite(pulseWidth);
  } catch(err) {
    console.log(err)
  }
}

const tempSensor = async (io) => {
  const now = Date.now()

  if (now - lastEmitTime >= 10000) { // check every 10sec
    lastEmitTime = now

    const value = dht11.read(11, 17)

    const humidity = value.humidity
    const tempC = value.temperature

    console.log(`C: ${tempC}, H: ${humidity}`)

    if (tempC > 30) {
      if (now - lastNotifyTime >= 60000) { // send notify every minute
        lastNotifyTime = now
        notifyHighTemp(tempC, humidity)
      }
    }

    if (now - lastSaveTime >= 1800000) { // save data every 30 minutes 
      lastSaveTime = now

      const temperature = new Temp({ temp: tempC })
      const hum = new Humidity({ humidity: humidity })

      io.emit('temp', temperature)
      io.emit('humidity', hum)
      await temperature.save()
      await hum.save()
    }
  }

  await Temp.deleteMany({ createdAt: { $lt: now - 172800000 } })
  await Humidity.deleteMany({ createdAt: { $lt: now - 172800000 } })
}

const duskSensor = async (io) => {
  try {
    const duskLeds = await Device.find({type: "dusk"})

    for(let i = 0; duskLeds.length > i; i++){
      const value = i2c1.readByteSync(PCF8591T_ADDRESS, 0x40);
      const LED = new Gpio(duskLeds[i].gpio, { mode: Gpio.OUTPUT });
      const currentValue = LED.digitalRead();  

      if(value > 210) {
        LED.digitalWrite(0);
        duskLeds[i].state = true
      } else {
        LED.digitalWrite(1);
        duskLeds[i].state = false
      }
    }
    
    for (let i = 0; i < duskLeds.length; i++) {
      io.emit('dusk', duskLeds[i])
      await duskLeds[i].save()
    }
  } catch(err) {
    console.log(err)
  }
}

module.exports = {toggleLED, tempSensor, duskSensor, toggleServo}
