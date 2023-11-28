const db = require('../util/Database')

class Product{
    async CreateProduct(data){
        const productId = await db.query('INSERT INTO "product"(name, supplier_id, type_id, price, description) VALUES ($1, $2, $3, $4, $5) RETURNING product_id', [data.name, data.supplierId, data.typeId, data.price, data.description])
        return await this.GetProduct(productId.rows[0].product_id)
    }

    async GetProducts(limit = 100){
        const products = await db.query('SELECT product_id, product.name, supplier.name as supplier, product_type.name as type, price, description FROM "product" LEFT JOIN "supplier" USING(supplier_id) LEFT JOIN "product_type" USING(type_id) LIMIT $1', [limit])
        return products.rows
    }
    async GetProduct(productId){
        const product = await db.query('SELECT product_id, product.name, supplier.name as supplier, product_type.name as type, price, description FROM "product" LEFT JOIN "supplier" USING(supplier_id) LEFT JOIN "product_type" USING(type_id) WHERE product_id = $1 LIMIT 1', [productId])
        return product.rows[0]
    }
    async GetSuppliers(){
        const suppliers = await db.query('SELECT * FROM "supplier"')
        return suppliers.rows
    }
    async GetSupplier(supplierId){
        const supplier = await db.query('SELECT * FROM supplier WHERE supplier_id = $1 LIMIT 1', [supplierId])
        return supplier.rows[0]
    }
    async GetProductTypes(){
        const types = await db.query('SELECT * FROM "product_type"')
        return types.rows
    }
    async GetProductType(typeId){
        const type = await db.query('SELECT * FROM product_type WHERE type_id = $1 LIMIT 1', [typeId])
        return type.rows[0]
    }

    async EditProduct(productId, data){
        if(data.name) await db.query('UPDATE "product" SET name = $1 WHERE product_id = $2', [data.name, productId])
        if(data.supplierId) await db.query('UPDATE "product" SET supplier_id = $1 WHERE product_id = $2', [data.supplierId, productId])
        if(data.typeId) await db.query('UPDATE "product" SET type_id = $1 WHERE product_id = $2', [data.typeId, productId])
        if(data.price) await db.query('UPDATE "product" SET price = $1 WHERE product_id = $2', [data.price, productId])
        if(data.description) await db.query('UPDATE "product" SET description = $1 WHERE product_id = $2', [data.description, productId])
        return await this.GetProduct(productId)
    }

    async DeleteProduct(productId){
        const deleted = await this.GetProduct(productId)
        await db.query('DELETE FROM "product" WHERE product_id = $1', [productId])
        return deleted
    }
}

module.exports = new Product()