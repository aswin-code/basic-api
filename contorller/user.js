const userModel = require('../model/user')
exports.getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find({})
        res.status(200).json(users)
    } catch (error) {
        console.log(error)
    }
}
exports.getAUsers = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id)
        res.status(200).json(user)

    } catch (error) {
        console.log(error)
    }
}