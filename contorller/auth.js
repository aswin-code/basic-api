const userModel = require('../model/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        const found = await userModel.findOne({ email })
        if (!found) return res.status(400).json({ message: 'invalid email' })
        const valid = bcrypt.compare(password, found.password)
        if (!valid) return res.status(400).json({ message: 'invalid password' })
        const token = jwt.sign({ user: found._id }, process.env.JWT_SECRET_KEY)
        res.cookie('jwt', token, {
            expires: new Date(Date.now() + 900000),
            httpOnly: true
        }).json({ message: "login successfull" })

    } catch (error) {
        console.log(error)
    }
}
exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) return res.status(400).json({ message: 'all fields required' })
        if (password.length <= 7) return res.status(400).json({ message: 'password min length 8' })
        const found = await userModel.findOne({ email })
        if (found) return res.status(400).json({ message: 'user already exist' })
        const hash = await bcrypt.hash(password, 10)
        const newUser = new userModel({ name, email, password: hash })
        await newUser.save()
        res.status(201).json({ message: 'signup successfull' })
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: error.message })
    }
}
exports.logout = async (req, res) => {
    try {
        res.clearCookie('jwt', { path: '/' })
        res.status(200).json({ message: 'logout successfull' })
    } catch (error) {
        console.log(error)
    }
}