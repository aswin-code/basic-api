const router = require('express').Router()
const authController = require('../contorller/auth')
router.route('/login')
    .post(authController.login)

router.route('/signup')
    .post(authController.signup)
router.route('/logout')
    .get(authController.logout)

module.exports = router