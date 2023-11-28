const { decodeData } = require("../models/User")

module.exports = (req, res, next) => {
    try {
        if(!req.user.userId || !req.user.role || req.user.role != "Администратор"){
            return res.status(403).json({message: "Forbidden"})
        }

        next()
    } catch (e) {
        console.log(e)
        return res.status(403).json({message: "Forbidden"})
    }
}