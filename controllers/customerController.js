const user = require('../models/User')
const product = require('../models/Product')
const {validationResult} = require('express-validator')

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
}

module.exports = new CustomerController()