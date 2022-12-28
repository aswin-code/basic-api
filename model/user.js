const mongoose = require('mongoose')
const { isEmail } = require('validator')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required"]
    },
    email: {
        type: String,
        required: true,
        validate: [isEmail, "invalid email"]
    },
    password: {
        type: String,
        required: [true, "password required"]
    }
})
const userModel = mongoose.model('user', userSchema)

module.exports = userModel

