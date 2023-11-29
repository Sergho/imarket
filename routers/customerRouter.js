const Router = require('express')
const customerController = require('../controllers/customerController')
const router = Router()

router.get('/users/self', customerController.SelfData)
router.get('/products', customerController.GetProducts)
router.get('/products/:productId', customerController.GetProduct)
router.get('/cart', customerController.GetShoppingCart)
router.post('/cart', customerController.AddItemToCart)
router.delete('/cart/:productId', customerController.DeleteItemFromCart)
router.post('/orders')
router.get('/orders')
router.get('/orders/:orderId')

module.exports = router