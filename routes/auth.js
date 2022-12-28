const router = require('express').Router()
const authController = require('../contorller/auth')
const verifyJWT = require('../middleware/verifyJWT')
router.route('/login')
    .post(authController.login)

router.route('/signup')
    .post(authController.signup)
router.route('/logout')
    .get(verifyJWT, authController.logout)

module.exports = router