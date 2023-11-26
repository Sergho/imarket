const Router = require('express')
const authController = require('../controllers/authorizationController')
const router = new Router()

router.use(Router.json())

router.post('/register', authController.register)
router.post('/login', authController.login)

module.exports = router