const app = require('express')()
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
require('dotenv').config()


const connectString = process.env.DB_CONNECTION_STIRNG
const PORT = process.env.PORT || 5000


const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')
const verifyJWT = require('./middleware/verifyJWT')


app.use(express.urlencoded())
app.use(cookieParser())
app.use(express.json())
app.use(morgan('tiny'))


app.use('/api/v1/auth', authRoute)
app.use('/api/v1/users', verifyJWT, userRoute)


app.listen(PORT, () => {
    mongoose.connect(connectString, () => {
        console.log('db connected ')
    })
    console.log("server running on port", PORT)
})