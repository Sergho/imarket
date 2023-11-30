const db = require('../util/Database')
const user = require('../models/User')
const product = require('../models/Product')

class Order{
    async CreateOrder(userId){
        const orderId = await db.query('INSERT INTO "order"(user_id, date) VALUES($1, NOW()) RETURNING order_id', [userId])
        return await this.GetOrder(orderId.rows[0].order_id)
    }

    async GetOrder(orderId){
        const order = await db.query('SELECT * FROM "order" WHERE order_id = $1 LIMIT 1', [orderId])
        if(!order.rows[0]) return undefined
        return {
            order_id: order.rows[0].order_id,
            owner: await user.GetUser(order.rows[0].user_id),
            date: order.rows[0].date,
            items: await this.GetItems(order.rows[0].order_id)
        }
    }
    async GetOrderFilter(orderId, userId){
        const order = await db.query('SELECT * FROM "order" WHERE order_id = $1 AND user_id = $2 LIMIT 1', [orderId, userId])
        if(!order.rows[0]) return undefined
        return {
            order_id: order.rows[0].order_id,
            owner: await user.GetUser(order.rows[0].user_id),
            date: order.rows[0].date,
            items: await this.GetItems(order.rows[0].order_id)
        }
    }
    async GetOrders(userId){
        const result = []
        const orders = await db.query('SELECT order_id FROM "order" WHERE user_id = $1', [userId])
        for(const row of orders.rows){
            result.push(await this.GetOrderFilter(row.order_id, userId))
        }
        return result
    }
    async GetItems(orderId){
        const result = []
        const items = await db.query('SELECT product_id, amount FROM "order-product" WHERE order_id = $1', [orderId])
        for(const row of items.rows){
            const singleProduct = await product.GetProduct(row.product_id)
            await result.push({
                product: singleProduct,
                amount: row.amount
            })
        }
        return result
    }
    async GetItem(orderId, productId){
        const item = await db.query('SELECT product_id, amount FROM "order-product" WHERE order_id = $1 AND product_id = $2 LIMIT 1', [orderId, productId])
        if(!item.rows[0]) return undefined
        return {
            product: await product.GetProduct(item.rows[0].product_id),
            amount: item.rows[0].amount
        }
    }

    async AddItem(orderId, productId, amount){
        await db.query('INSERT INTO "order-product" VALUES ($1, $2, $3)', [orderId, productId, amount])
        return {
            product: await product.GetProduct(productId),
            amount: amount
        }
    }

    async EditOrder(orderId, data){
        if(data.ownerId) await db.query('UPDATE "order" SET user_id = $1 WHERE order_id = $2', [data.ownerId, orderId])
        if(data.date) await db.query('UPDATE "order" SET date = $1 WHERE order_id = $2', [data.date, orderId])
        return await this.GetOrder(orderId)
    }

    async DeleteItem(orderId, productId){
        const deleted = this.GetItem(orderId, productId)
        await db.query('DELETE FROM "order-product" WHERE order_id = $1 AND product_id = $2', [orderId, productId])
        return deleted
    }
    async DeleteItems(orderId){
        await db.query('DELETE FROM "order-product" WHERE order_id = $1', [orderId])
        return
    }
    async DeleteOrder(orderId){
        const deleted = await this.GetOrder(orderId)
        await this.DeleteItems(orderId)
        await db.query('DELETE FROM "order" WHERE order_id = $1', [orderId])
        return deleted
    }
}

module.exports = new Order()