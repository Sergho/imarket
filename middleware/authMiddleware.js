const { decodeData } = require("../models/User")

module.exports = (req, res, next) => {
    try {
        if(!req.headers.authorization){
            return res.status(401).json({message: "Unauthorized"})
        }
        
        const token = req.headers.authorization.split(' ')[1]
        if(!token){
            return res.status(401).json({message: "Unauthorized"})
        }

        const decoded = decodeData(token)
        if(!decoded.user_id || !decoded.role){
            return res.status(401).json({message: "Unauthorized"})
        }
        req.user = decoded

        next()
    } catch (e) {
        console.log(e)
        return res.status(401).json({message: "Unauthorized"})
    }
}