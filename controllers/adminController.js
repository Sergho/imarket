const user = require('../models/User')
const product = require('../models/Product')
const order = require('../models/Order')

class AdminController{
    async GetRoles(req, res){
        try {
            const roles = await user.GetRoles()
            if(roles.length === 0){
                return res.status(404).json({message: "Roles not found"})
            }

            return res.status(200).json({message: "OK", roles: roles})
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "Roles error"}) 
        }
    }
    async GetUsers(req, res){
        try {
            const users = await user.GetUsers(req.query.limit)
            if(users.length === 0){
                res.status(404).json({message: "Users not found"})
            }
            res.status(200).json({message: "OK", users: users})
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "Users error"})
        }
    }
    async GetUser(req, res){
        try {
            if(!req.params.userId){
                return res.status(400).json({message: "Bad request"})
            }

            const singleUser = await user.GetUser(req.params.userId)
            if(!singleUser){
                return res.status(404).json({message: "User not found"})
            }
            return res.status(200).json({message: "OK", user: singleUser})
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "User error"})
        }
    }
    async EditUser(req, res){
        try {
            if(!req.params.userId){
                return res.status(400).json({message: "Bad request"})
            }

            if(req.body.roleId && !await user.GetRole(req.body.roleId)){
                return res.status(404).json({message: "Role not found"})
            }

            const duplicate = await user.FindUser(req.body.email)
            if(req.body.email && duplicate && duplicate.user_id != req.params.userId){
                return res.status(409).json({message: "Another user with this email already exists"})
            }

            const modified = await user.EditUser(req.params.userId, req.body)
            if(!modified){
                return res.status(404).json({message: "User not found"})
            }
            return res.status(200).json({message: "User modified", user: modified})
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "User error"})
        }
    }
    async DeleteUser(req, res){
        try {
            if(!req.params.userId){
                return res.status(400).json({message: "Bad request"})
            }

            const deleted = await user.DeleteUser(req.params.userId)
            if(!deleted){
                return res.status(404).json({message: "User not found"})
            }

            return res.status(200).json({message: "User deleted", user: deleted})
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "User error"})
        }
    }

    async GetSuppliers(req, res){
        try {
            const suppliers = await product.GetSuppliers()
            if(suppliers.length === 0){
                return res.status(404).json({message: "Suppliers not found"})
            }

            return res.status(200).json({message: "OK", suppliers: suppliers})
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "Suppliers error"})
        }
    }
    async GetProductTypes(req, res){
        try {
            const types = await product.GetProductTypes()
            if(types.length === 0){
                return res.status(404).json({message: "Product types not found"})
            }

            return res.status(200).json({message: "OK", productTypes: types})
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "Product types error"})
        }
    }
    async CreateProduct(req, res){
        try {
            if(!req.body.name || !req.body.price){
                return res.status(400).json({message: "Bad request"})
            }

            const newProduct = await product.CreateProduct(req.body)
            return res.status(201).json({message: "Product created", product: newProduct})
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "Product error"})
        }
    }
    async EditProduct(req, res){
        try {
            if(!req.params.productId){
                return res.status(400).json({message: "Bad request"})
            }

            if(req.body.supplierId && !await product.GetSupplier(req.body.supplierId)){
                return res.status(404).json({message: "Supplier not found"})
            }

            if(req.body.typeId && !await product.GetProductType(req.body.typeId)){
                return res.status(404).json({message: "Product type not found"})
            }

            const modified = await product.EditProduct(req.params.productId, req.body)
            if(!modified){
                return res.status(404).json({message: "Product not found"})
            }
            return res.status(200).json({message: "Product modified", product: modified})
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "Product error"})
        }
    }
    async DeleteProduct(req, res){
        try {
            if(!req.params.productId){
                return res.status(400).json({message: "Bad request"})
            }

            const deleted = await product.DeleteProduct(req.params.productId)
            if(!deleted){
                return res.status(404).json({message: "Product not found"})
            }

            return res.status(200).json({message: "Product deleted", product: deleted})
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "Product error"})
        }
    }

    async GetOrders(req, res){
        try {
            if(!req.params.userId){
                return res.status(400).json({message: "Bad request"})
            }

            const orders = await order.GetOrders(req.params.userId)
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

            const singleOrder = await order.GetOrder(req.params.orderId)
            if(!singleOrder){
                return res.status(404).json({message: "Order not found"})
            }

            return res.status(200).json({message: "OK", order: singleOrder})
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "Order error"})
        }
    }
    async EditOrder(req, res){
        try {
            if(!req.params.orderId){
                return res.status(400).json({message: "Bad request"})
            }

            if(req.body.ownerId && !await user.GetUser(req.body.ownerId)){
                return res.status(404).json({message: "Owner not found"})
            }

            if(!await order.GetOrder(req.params.orderId)){
                return res.status(404).json({message: "Order not found"})
            }

            const modified = await order.EditOrder(req.params.orderId, req.body)
            if(!modified){
                return res.status(404).json({message: "Order not found"})
            }
            return res.status(200).json({message: "Order modified", order: modified})
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "Order error"})
        }
    }
    async AddItemToOrder(req, res){
        try {
            if(!req.params.orderId || !req.params.productId || !req.body.amount){
                return res.status(400).json({message: "Bad request"})
            }
            
            if(!await product.GetProduct(req.params.productId)){
                return res.status(404).json({message: "Product not found"})
            }

            if(!await order.GetOrder(req.params.orderId)){
                return res.status(404).json({message: "Order not found"})
            }

            if(await order.GetItem(req.params.orderId, req.params.productId)){
                return res.status(409).json({message: "Product is already in the order"})
            }

            const item = await order.AddItem(req.params.orderId, req.params.productId, req.body.amount)
            return res.status(200).json({message: "Item added to the order", item: item})
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "Order error"})
        }
    }
    async DeleteItemFromOrder(req, res){
        try {
            if(!req.params.orderId || !req.params.productId){
                return res.status(400).json({message: "Bad request"})
            }

            if(!await order.GetOrder(req.params.orderId)){
                return res.status(404).json({message: "Order not found"})
            }

            if(!await order.GetItem(req.params.orderId, req.params.productId)){
                return res.status(404).json({message: "Product not found in the order"})
            }

            const deleted = await order.DeleteItem(req.params.orderId, req.params.productId)
            return res.status(200).json({message: "Item deleted from order", item: deleted})
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "Order error"})
        }
    }
    async DeleteOrder(req, res){
        try {
            if(!req.params.orderId){
                return res.status(400).json({message: "Bad request"})
            }

            const deleted = await order.DeleteOrder(req.params.orderId)
            if(!deleted){
                return res.status(404).json({message: "Order not found"})
            }

            return res.status(200).json({message: "Order deleted", order: deleted})
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "Order error"})
        }
    }
}

module.exports = new AdminController()