const user = require('../models/User')
const product = require('../models/Product')
const shoppingCart = require('../models/ShoppingCart')
const order = require('../models/Order')

class CustomerController{
    async SelfData(req, res){
        try {
            const self = await user.GetUser(req.user.userId)
            if(!self){
                return res.status(404).json({message: "Data not found"})
            }
            return res.status(200).json({message: "OK", user: self})
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "User error"})
        }
    }
    async GetProducts(req, res){
        try {
            const products = await product.GetProducts(req.query.limit)
            if(products.length === 0){
                res.status(404).json({message: "Products not found"})
            }
            res.status(200).json({message: "OK", products: products})
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "Product error"})
        }
    }
    async GetProduct(req, res){
        try {
            if(!req.params.productId){
                return res.status(400).json({message: "Bad request"})
            }

            const singleProduct = await product.GetProduct(req.params.productId)
            if(!singleProduct){
                return res.status(404).json({message: "Product not found"})
            }
            return res.status(200).json({message: "OK", product: singleProduct})
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "Product error"})
        }
    }

    async GetShoppingCart(req, res){
        try {
            const cart = await shoppingCart.GetCart(req.user.userId)
            if(cart.items.length == 0){
                return res.status(404).json({message: "Shopping cart is empty"})
            }
            return res.status(200).json({message: "OK", shopping_cart: cart})
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "Shopping cart error"})
        }
    }
    async AddItemToCart(req, res){
        try {
            if(!req.body.productId || !req.body.amount){
                return res.status(400).json({message: "Bad request"})
            }

            if(!await product.GetProduct(req.body.productId)){
                return res.status(404).json({message: "Product not found"})
            }

            if(await shoppingCart.GetItem(req.user.userId, req.body.productId)){
                return res.status(409).json({message: "The item is already in the shopping cart"})
            }
            
            const item = await shoppingCart.AddItem(req.user.userId, req.body.productId, req.body.amount)
            return res.status(201).json({message: "Item added to the shopping cart", item: item})
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "Shopping cart error"})
        }
    }
    async DeleteItemFromCart(req, res){
        try {
            if(!req.params.productId){
                return res.status(400).json({message: "Bad request"})
            }

            if(!await product.GetProduct(req.params.productId)){
                return res.status(404).json({message: "Product not found"})
            }

            if(!await shoppingCart.GetItem(req.user.userId, req.params.productId)){
                return res.status(404).json({message: "The item not found in the shopping cart"})
            }

            const deleted = await shoppingCart.DeleteItem(req.user.userId, req.params.productId)
            return res.status(200).json({message: "Item deleted from the shopping cart", item: deleted})
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "Shopping cart error"})
        }
    }

    async CreateOrder(req, res){
        try {
            const cartItems = await shoppingCart.GetItems(req.user.userId)
            if(cartItems.length == 0){
                return res.status(404).json({message: "Shopping cart is empty"})
            }

            const newOrder = await order.CreateOrder(req.user.userId)
            for(const item of cartItems){
                await order.AddItem(newOrder.order_id, item.product.product_id, item.amount)
            }

            await shoppingCart.ClearCart(req.user.userId)

            const filledOrder = await order.GetOrder(newOrder.order_id)
            return res.status(201).json({message: "Order created", order: filledOrder})
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "Order error"})
        }
    }
    async GetOrders(req, res){
        try {
            const orders = await order.GetOrders(req.user.userId)
            if(orders.length == 0){
                return res.status(404).json({message: "Orders not found"})
            }

            return res.status(200).json({message: "OK", orders: orders})
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "Order error"})
        }
    }
    async GetOrder(req, res){
        try {
            if(!req.params.orderId){
                return res.status(400).json({message: "Bad request"})
            }

            const singleOrder = await order.GetOrderFilter(req.params.orderId, req.user.userId)
            if(!singleOrder){
                return res.status(404).json({message: "Order not found"})
            }

            return res.status(200).json({message: "OK", order: singleOrder})
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "Order error"})
        }
    }
}

module.exports = new CustomerController()