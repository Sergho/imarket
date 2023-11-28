const Router = require('express')
const authController = require('../controllers/authorizationController')
const router = new Router()

router.use(Router.json())

router.post('/register', authController.Register)
router.post('/login', authController.Login)

module.exports = router