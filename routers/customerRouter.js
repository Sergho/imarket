const Router = require('express')
const customerController = require('../controllers/customerController')
const router = Router()

router.get('/users/self', customerController.selfData)
router.get('/products')
router.get('/products/:product_id')
router.get('/cart')
router.post('/cart/:product_id')
router.delete('/cart/:product_id')
router.post('/orders')
router.get('/orders')
router.get('/orders/:order_id')

module.exports = router