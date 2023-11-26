const user = require('../models/User')
const {validationResult} = require('express-validator')

class CustomerController{
    async selfData(req, res){
        try {
            const self = await user.getUser(req.user.user_id)
            if(!self){
                return res.status(404).json({message: "Data not found"})
            }
            return res.status(200).json({message: "OK", user: self})
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "User data error"})
        }
    }
}

module.exports = new CustomerController()