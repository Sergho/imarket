const user = require('../models/User')

class AuthController{
    async register(req, res){
        try {
            if(!req.body.email || !req.body.password){
                return res.status(400).json({message: "Bad request"})
            }

            console.log(await user.findUser(req.body.email))

            if(await user.findUser(req.body.email)){
                return res.status(409).json({message: "Another user with this email already exists"})
            }

            const newUser = await user.createUser(req.body)
            return res.status(201).json({message: "User created", user: newUser})

        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "Registration error"})
        }
    }
    async login(req, res){
        try {
            if(!req.body.email || !req.body.password){
                return res.status(400).json({message: "Bad request"})
            }

            if(!await user.findUser(req.body.email)){
                return res.status(404).json({message: "User not found"})
            }

            if(!await user.checkPassword(req.body.email, req.body.password)){
                return res.status(401).json({message: "Incorrect password"})
            }

            const token = await user.generateAccessToken(req.body.email)
            return res.status(202).json({token})
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "Login error"})
        }
    }
}

module.exports = new AuthController()