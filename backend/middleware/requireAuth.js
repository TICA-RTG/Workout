const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAuth = async (req, res, next) => {

    // verify authentication
    const { authorization } = req.headers

if (!authorization) {
    return res.status(401).json({ error: 'Authorization token required  ' })
}

const token = authorization.split(' ')[1]

if (!token) {  //check if token exists
    return res.status(401).json({ error: 'Invalid token' });
  }

try {
    const { _id } = jwt.verify(token, process.env.SECRET)

    req.user = await User.findOne({ _id }).select('_id')

    if (!req.user) { // Check if user exists after token verification.
        return res.status(401).json({ error: 'User not found' });
      }

    next()

} catch(error) {
    console.error("Authentication error:", error);
    res.status(401).json({error: 'Request is not authorized'})
}
}

module.exports = requireAuth