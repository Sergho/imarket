const user = require('../models/User')
const {validationResult} = require('express-validator')

class AdminController{
    async getRoles(req, res){
        try {
            const roles = await user.getRoles()
            if(roles.length === 0){
                return res.status(404).json({message: "Roles not found"})
            }

            return res.status(200).json({message: "OK", roles: roles})
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "Roles error"}) 
        }
    }
    async getUsers(req, res){
        try {
            const users = await user.getUsers(req.query.limit)
            if(users.length === 0){
                res.status(404).json({message: "Users not found"})
            }
            res.status(200).json({message: "OK", users: users})
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "Users error"})
        }
    }
    async getUser(req, res){
        try {
            if(!req.params.user_id){
                return res.status(400).json({message: "Bad request"})
            }

            const singleUser = await user.getUser(req.params.user_id)
            if(!singleUser){
                return res.status(404).json({message: "User not found"})
            }
            return res.status(200).json({message: "OK", user: singleUser})
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "User error"})
        }
    }
    async changeRole(req, res){
        try {
            if(!req.body.roleId || !req.params.user_id){
                return res.status(400).json({message: "Bad request"})
            }

            const modified = await user.changeRole(req.params.user_id, req.body.roleId)
            if(!modified){
                return res.status(404).json({message: "User not found"})
            }

            res.status(200).json({message: "User role changed", user: modified})
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "User error"})
        }
    }
    async editUser(req, res){
        try {
            if(!req.params.user_id){
                return res.status(400).json({message: "Bad request"})
            }

            await user.editUserNames(req.params.user_id, req.body)
            await user.editUserPassword(req.params.user_id, req.body.password)

            if(await user.findUser(req.body.email)){
                return res.status(409).json({message: "Another user with this email already exists"})
            }

            await user.editUserEmail(req.params.user_id, req.body.email)

            const modified = await user.getUser(req.params.user_id)
            if(!modified){
                return res.status(404).json({message: "User not found"})
            }
            return res.status(200).json({message: "User modified", user: modified})

        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "User error"})
        }
    }
    async deleteUser(req, res){
        try {
            if(!req.params.user_id){
                return res.status(400).json({message: "Bad request"})
            }

            const deleted = await user.deleteUser(req.params.user_id)
            if(!deleted){
                return res.status(404).json({message: "User not found"})
            }

            return res.status(200).json({message: "User deleted", user: deleted})
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "User error"})
        }
    }
}

module.exports = new AdminController()