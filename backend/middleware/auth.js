const User = require('../models/user.model')
const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const token = authorization.split(' ')[1];
    const { id: _id } = jwt.verify(token, process.env.JWT);

    req.user = await User.findOne({ _id }).select('-password');
    next();
  } catch (error) {
    res.status(401).json({ errors: error.message });
    console.log(error);
  }
};
module.exports = {auth}