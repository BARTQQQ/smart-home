const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

const auth = async (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({ message: 'Authorization token required' })
  }

  const token = authorization.split(' ')[1]

  try {
    const { id, exp } = jwt.verify(token, process.env.JWT)
    const user = await User.findOne({ _id: id }).select('-password')

    if (!user) {
      return res.status(401).json({ message: 'Request is not authorized' })
    }

    if (Date.now() >= exp * 1000) {
      return res.status(401).json({ message: 'Token has expired' })
    }

    req.user = user
    next()
  } catch (error) {
    res.status(401).json({ message: 'Request is not authorized' })
    console.log(error)
  }
}

module.exports = {auth}