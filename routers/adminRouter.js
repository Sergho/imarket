const Router = require('express')
const adminController = require('../controllers/adminController')
const router = Router()

router.get('/roles', adminController.GetRoles)
router.get('/users', adminController.GetUsers)
router.get('/users/:userId', adminController.GetUser)
router.put('/users/:userId', adminController.EditUser)
router.delete('/users/:userId', adminController.DeleteUser)
router.get('/suppliers', adminController.GetSuppliers)
router.get('/product/types', adminController.GetProductTypes)
router.post('/products', adminController.CreateProduct)
router.put('/products/:productId', adminController.EditProduct)
router.delete('/products/:productId', adminController.DeleteProduct)
router.get('/users/:userId/orders')
router.get('/users/:userId/orders/:orderId')

module.exports = router