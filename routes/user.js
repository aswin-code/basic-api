const router = require('express').Router()
const userController = require('../contorller/user')
router.route('/')
    .get(userController.getAllUsers)

router.route('/:id')
    .get(userController.getAUsers)

module.exports = router