const user = require('../models/User')
const product = require('../models/Product')

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
}

module.exports = new AdminController()