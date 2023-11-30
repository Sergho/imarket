const db = require('../util/Database')
const product = require('../models/Product')
const user = require('../models/User')

class ShoppingCart{
    async GetCart(userId){
        const cart = {
            owner: await user.GetUser(userId),
            items: await this.GetItems(userId)
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
    async GetItems(userId){
        const result = []
        const items = await db.query('SELECT product_id, amount FROM "shopping_cart" WHERE user_id = $1', [userId])
        for(const row of items.rows){
            const singleProduct = await product.GetProduct(row.product_id)
            await result.push({
                product: singleProduct,
                amount: row.amount
            })
        }
        return result
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
    async ClearCart(userId){
        await db.query('DELETE FROM "shopping_cart" WHERE user_id = $1', [userId])
        return await this.GetCart(userId)
    }
}

module.exports = new ShoppingCart()