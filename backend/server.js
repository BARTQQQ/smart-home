const express = require('express')
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')
const cors = require('cors')

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

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}))

app.use('/api/user', require('./routes/user.route'))
app.use('/api/event', require('./routes/event.route'))

app.listen(port, () => console.log(`Server started on port ${port}`))