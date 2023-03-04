const dotenv = require("dotenv")
const nodemailer = require("nodemailer")

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

module.exports = { verifyEmail }