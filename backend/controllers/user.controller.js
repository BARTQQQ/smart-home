const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const dotenv = require('dotenv').config()
const Email = require('../services/email.service')
const User = require('../models/user.model')
const mongoose = require('mongoose')



// @desc add new user
// @route POST /api/user/add
const registerUser = async (req, res) => {

  const { nickname, password, email } = req.body
  
  const userNickname = await User.findOne({nickname})
  const userEmail = await User.findOne({email})

  if (userNickname || userEmail) {
    return res.status(400).json({errors: 'Użytkownik o podanym mailu lub nazwie użytkownika już istnieje'})
  }
  
    // Hash the password before saving it to the database
    const hash = bcrypt.hashSync(password, 10)
    const emailToken = generateTokenEmail(nickname)
    console.log(emailToken)

    // Create a new user with the given details
    const user = new User({ nickname, password: hash, email })
    Email.verifyEmail(email, nickname, emailToken)
    await user.save()

    res.status(201).json({ message: 'Konto zostało pomyślnie stworzone, niech nowy użytkownik potwierdzi swój email' })
}

// @desc login users
// @route POST /api/user/
const loginUser = async (req, res) => {
  const { nickname, password } = req.body;

  if (!nickname || !password) {
    // Nickname and/or password are missing, return an error response
    res.status(400).json({ errors: ["Nickname i hasło są wymagane"] });
    return;
  }

  try {
    // Create a user object with the given values
    const user = await User.findOne({ nickname })

    if (!user) {
      return res.status(400).json({errors: ["Użytkownik o podanej nazwie nie istnieje"]})
    }

    if (!user.confirmedEmail) {
      return res.status(400).json({errors: ["Zweryfikuj swój email przed zalogowaniem"]})
    }

    // Check if the user exists and the password is correct
    if (user && (await bcrypt.compare(password, user.password))) {
      // User is valid, generate a JSON Web Token and send it in the response
      res.json({
        name: user.name,
        surname: user.surname,
        nickname: user.nickname,
        token: generateTokenLogin(user._id),
      });
    } else {
      // User does not exist or password is incorrect, return an error response
      res.status(400).json({ errors: ["Błędna nazwa konta lub hasło"] });
    }
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      // Get the error messages for each validation error
      const errorMessages = Object.values(error.errors).map(val => val.message);
      // Send a JSON response with the error messages
      res.status(400).json({ errors: errorMessages });
    } else {
      // Handle other errors
      console.error(error);
    }
  }
}

const updateUser = async (req, res) => {
  try {
    const { id } = req.params
    const { name, surname, nickname, password, email } = req.body

    // Find the user with the given ID
    const user = await User.findById(id)

    // If the user is not found, return an error
    if (!user) {
      return res.status(404).json({ message: 'Nie znaleziono użytkownika' })
    }

    // Update the user's details
    user.name = name || user.name
    user.surname = surname || user.surname
    user.nickname = nickname || user.nickname
    if (password) {
      user.password = await bcrypt.hash(password, 10)
    }
    user.email = email || user.email
    await user.save()

    res.json({ message: 'Konto zostało pomyślnie zaktualizowane', user })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// @desc get users
// @route GET /api/user/
const getUser = async (req, res) => {
  return res.status(200).json(req.user)
}

const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password')
    return res.status(200).json(users)
  } catch (error) {
    return res.json(error.message)
  }
}

const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
  
    if(!user) {
        return res.status(400).json({message: 'Nie ma takiego użytkownika'})
    }
  
    await user.remove()
  
    res.status(200).json('Pomyślnie usunięto')
  } catch(error) {
    return res.json(error.message)
  }
}


const emailVerify = async (req, res) => {
  try {
    const {nickname, emailToken} = req.params
    const user = await User.findOne({nickname})

    if(!user || !emailToken){
      return res.status(400).json({errors: 'Błędny użytkownik lub token jest nie ważny'})
    }
    await User.updateOne({nickname: nickname},{
      $set:{
        confirmedEmail: true,
      }
    })
    return res.status(201).json({message: 'Email został pomyślnie zweryfikowany'})
  } catch (error) {
    return res.json({errors: error})
  }
}

const generateTokenLogin = (id) => {
  return jwt.sign({ id }, process.env.JWT, {
    expiresIn: '1d',
  })
}

const generateTokenEmail = (id) => {
  return jwt.sign({ id }, process.env.JWT, {
    expiresIn: '1h',
  })
}

module.exports = {registerUser, loginUser, getUser, getUsers, emailVerify, deleteUser, updateUser}