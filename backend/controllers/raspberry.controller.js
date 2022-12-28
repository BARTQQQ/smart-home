const Gpio = require('onoff').Gpio
const i2c = require('i2c-bus');

//0x40 fotorezystor
//0x41 temperatura
//0x42 potencjometr

// i2c settings
const busNubmer = 1;
const PCF8591T_ADDRESS = 0x48;

const i2c1 = i2c.openSync(busNubmer);

const toggleLED = async (req, res) => {
	try {
		const {pin} = req.body

		const LED = new Gpio(pin, 'input');
		const currentValue = LED.readSync();

		LED.writeSync(currentValue === 0 ? 1 : 0);
		
		return res.status(200).json({ succeed: [LED.readSync() === 1 ? "wlaczone" : "wylaczone"] });
	} catch(err){
		console.log(err)
	}
}

const tempSensor = async (req, res) => {
			//i2c1.writeByteSync(PCF8591T_ADDRESS, 0x41, 0x00);
			const value = i2c1.readByteSync(PCF8591T_ADDRESS, 0x40);
			
			const tempC = (-value + 420) / 10;
			const tempF = tempC * 1.8 + 32
			
			console.log(`C: ${tempC}, F: ${tempF}`)
			return res.status(200).json(tempC)
}

const duskSensor = async (req, res) => {
	const {pin} = req.body
	const value = i2c1.readByteSync(PCF8591T_ADDRESS, 0x40);
	const LED = new Gpio(pin, 'input');
	const currentValue = LED.readSync();	
	
	if(value > 210) {
		LED.writeSync(1);
		return res.status(200).json('ciemno')
	} else {
		LED.writeSync(0);
		return res.status(200).json('jasno')
	}
}

module.exports = {toggleLED, tempSensor, duskSensor}
