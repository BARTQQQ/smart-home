const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const dotenv = require('dotenv').config()
const User = require('../models/user.model')
const mongoose = require('mongoose')



// @desc add new user
// @route POST /api/user/add
const registerUser = async (req, res) => {
  
}

// @desc login users
// @route POST /api/user/
const loginUser = async (req, res) => {
  const { nickname, password } = req.body;


  if (!nickname && userCount > 0) {
    // Nickname are missing, return an error response
    res.status(400).json({ errors: ["Nickname jest wymagane"] });
    return;
  }

  if (!password && userCount > 0) {
    // Password and/or password are missing, return an error response
    res.status(400).json({ errors: ["Hasło jest wymagane"] });
    return;
  }

  try {
    // Create a user object with the given values
    const user = await User.findOne({ nickname })
    await user.validate();

    // Check if the user exists and the password is correct
    if (user && (await bcrypt.compare(password, user.password))) {
      // User is valid, generate a JSON Web Token and send it in the response
      res.json({
        name: user.name,
        surname: user.surname,
        nickname: user.nickname,
        token: generateToken(user._id),
      });
    } else {
      // User does not exist or password is incorrect, return an error response
      res.status(400).json({ errors: ["Błędny nickname lub hasło"] });
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

// @desc get users
// @route GET /api/user/
const getUser = async (req, res) => {
  return res.status(200).json(req.user)
}

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT, {
    expiresIn: '30d',
  })
}

module.exports = {registerUser, loginUser, getUser}