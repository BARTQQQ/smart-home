const dotenv = require("dotenv")
const nodemailer = require("nodemailer")
const User = require('../models/user.model')

let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

const verifyEmail = async (email, nickname, token) => {
    try {
        await transporter.sendMail({
            from: "DOM",
            to: email,
            subject: "Weryfikacja konta",
            html: "<p>Cześć " + nickname + ",</p><br><a style='text-decoration: none; padding: 1em; background: #7e57c2; color: white;' href='http://localhost:3000/weryfikacja/" + nickname + "/" + token + "'>Zweryfikuj teraz</a>",
        })
    } catch (error) {
        console.log(error)
    }
}

const notifyHighTemp = async (temp, humidity) => {
    try {
        const users = await User.find().select('-password')

        for(let i = 0; i < users.length; i++) {
            await transporter.sendMail({
                from: "DOM",
                to: users[i].email,
                subject: `Wysoka temperatura w domu ${temp}°C`,
                html: `<p>Temperatura: ${temp}°C</p><p>Wilgotność: ${humidity}%</p>`,
            })
        }

    } catch (error) {
        console.log(error)
    }
}

module.exports = { verifyEmail, notifyHighTemp }
