const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String, 
        },
    surname: {
        type: String,
        },
    nickname: {
        type: String, 
        unique: true, 
        required: [true, 'Nickname jest wymagane']},
    password: {
        type: String, 
        required: [true, 'Hasło jest wymagane']},
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema)

module.exports = User

const createAdmin = async () => {
    const userCount = await User.countDocuments();
    const hash = bcrypt.hashSync(process.env.ADMIN, 10)

    try {
        if (userCount === 0) {
            // No users exist, create a new user with the username "admin" and password "admin"
            await User.create({ nickname: "admin", password: hash });
        }
    } catch(err) {
        console.log(err)
    }
}
createAdmin()