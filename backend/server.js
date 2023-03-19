const express = require('express')
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')
const cors = require('cors')
const socket = require('ws')
const {tempSensor, toggleLED, duskSensor, toggleServo} = require('./controllers/raspberry.controller.js')
const Gpio = require('onoff').Gpio
const i2c = require('i2c-bus')
const io = require("socket.io")(4001, {
    cors: {
        origin: "http://192.168.0.110:3000",
    }
})

const busNubmer = 1;
const PCF8591T_ADDRESS = 0x48;

const i2c1 = i2c.openSync(busNubmer);

const port = process.env.PORT
const app = express();
mongoose.set('strictQuery', false);

const connect = async () => {
    try {
        const conn = await mongoose.connect(process.env.URI)
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch(error) {
        console.log(error)
    }
}

connect()

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/user', require('./routes/user.route'))
app.use('/api/event', require('./routes/event.route'))
app.use('/api/city', require('./routes/city.route'))
app.use('/api/device', require('./routes/device.route'))

const server = app.listen(port, () => console.log(`Server started on port ${port}`))

io.on('connection', (socket) =>{
    console.log(`ws ID: ${socket.id}`)
    socket.on('sendState', ({ gpio, state, type }) => {
        io.emit('getState', { gpio, state, type })
        if(type === "led") {
            toggleLED(gpio)
        } 
        if(type === "servo") {
            toggleServo(gpio, state)
        }
    })
    
    socket.on('sendEvent', (eventData) => {
        socket.broadcast.emit('broadcastEvent', eventData);
    });
    
    socket.on('deleteEvent', (eventData) => {
        socket.broadcast.emit('broadcastDeleteEvent', eventData);
    });

    setInterval(() => {
        tempSensor(io)
    },  10000)
    
    setInterval(() => {
        duskSensor(io)
    },  1000)
    
})
