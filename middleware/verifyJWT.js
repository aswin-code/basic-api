const jwt = require('jsonwebtoken')
const userModel = require('../model/user')
const verifyJWT = (req, res, next) => {
    const token = req?.cookies?.jwt
    if (!token) return res.status(401).json({ message: 'unauthorized' })
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decode) => {
        if (err) return res.status(403).json({ message: 'Forbidden' })
        const id = decode.user
        const found = await userModel.findById(id)
        if (!found) return res.status(403).json({ message: 'Forbidden' })
        next()
    })
}

module.exports = verifyJWT