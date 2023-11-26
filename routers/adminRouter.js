const Router = require('express')
const adminController = require('../controllers/adminController')
const router = Router()

router.get('/roles', adminController.getRoles)
router.get('/users', adminController.getUsers)
router.get('/users/:user_id', adminController.getUser)
router.patch('/users/:user_id', adminController.changeRole)
router.put('/users/:user_id', adminController.editUser)
router.delete('/users/:user_id', adminController.deleteUser)
router.post('/products')
router.put('/products/:product_id')
router.delete('/products/:product_id')
router.get('/users/:user_id/orders')
router.get('/users/:user_id/orders/:order_id')

module.exports = router