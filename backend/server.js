const express = require('express')
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')
const cors = require('cors')
const socket = require('socket.io')

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
<<<<<<< HEAD
app.use('/api/raspberry', require('./routes/raspberry.route'))

const server = app.listen(port, () => console.log(`Server started on port ${port}`))
const io = socket(server)
=======
app.use('/api/city', require('./routes/city.route'))
>>>>>>> 45f7a4694288168c152db6af1e18168c5e979da6

io.on('connection', (socket) =>{
    console.log('Socket connection ID: ', socket.id)
})
