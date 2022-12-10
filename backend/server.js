const express = require('express')
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')

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

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });
  
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/user', require('./routes/user.route'))
// app.use('/api/group', require('./routes/group.route'))
// app.use('/api/event', require('./routes/event.route'))


app.listen(port, () => console.log(`Server started on port ${port}`))