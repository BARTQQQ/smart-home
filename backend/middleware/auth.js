const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

const auth = async (req, res, next) => {

  const { authorization } = req.headers
  if (!authorization) {
    return res.status(401).json({message: 'Authorization token required'})
  }

  const token = authorization.split(' ')[1]
  
  try {
    const _id = jwt.verify(token, process.env.JWT);
    req.user = await User.findOne({_id: _id.id}).select('-password')
    next()
  } catch (error) {
    res.status(401).json({message: 'Request is not authorized'})
    console.log(error)
  }
}

module.exports = {auth}