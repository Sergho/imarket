const db = require('../util/Database')
const product = require('../models/Product')
const user = require('../models/User')

class ShoppingCart{
    async GetCart(userId){
        const cart = {
            owner: await user.GetUser(userId),
            items: []
        }
        const products = await db.query('SELECT product_id, amount FROM "shopping_cart" WHERE user_id = $1', [userId])
        for(const row of products.rows){
            const singleProduct = await product.GetProduct(row.product_id)
            await cart.items.push({
                product: singleProduct,
                amount: row.amount
            })
        }
        return cart
    }
    async GetItem(userId, productId){
        const amount = await db.query('SELECT amount FROM "shopping_cart" WHERE user_id = $1 AND product_id = $2 LIMIT 1', [userId, productId])
        if(!amount.rows[0]) return undefined
        return {
            product: await product.GetProduct(productId),
            amount: amount.rows[0].amount
        }
    }

    async AddItem(userId, productId, amount){
        await db.query('INSERT INTO "shopping_cart" VALUES ($1, $2, $3)', [userId, productId, amount])
        return {
            product: await product.GetProduct(productId),
            amount: amount
        }
    }

    async DeleteItem(userId, productId){
        const deleted = await this.GetItem(userId, productId);
        await db.query('DELETE FROM "shopping_cart" WHERE user_id = $1 AND product_id = $2', [userId, productId])
        return deleted
    }
}

module.exports = new ShoppingCart()