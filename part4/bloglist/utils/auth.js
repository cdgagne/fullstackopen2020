const jwt = require('jsonwebtoken')
const User = require('../models/users')

const getUserFromToken = async (token) => {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return null
    }
    return await User.findById(decodedToken.id)
}

module.exports = {
    getUserFromToken,
}