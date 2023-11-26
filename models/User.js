const db = require('../util/Database')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {secret} = require('../config/jwtSecret')

class User{
    async createUser(data){
        const {
            firstName,
            lastName,
            midName,
            email,
            password
        } = data
        const passwordHash = bcrypt.hashSync(data.password, 7)
        const user_id = await db.query('INSERT INTO "user"(first_name, last_name, mid_name, email, password_hash) VALUES ($1, $2, $3, $4, $5) RETURNING user_id', [data.firstName, data.lastName, data.midName, data.email, passwordHash])

        return await this.getUser(user_id.rows[0].user_id)
    }
    async getUser(user_id){
        const user = await db.query('SELECT user_id, first_name, last_name, mid_name, email, password_hash, role.name as role FROM "user" JOIN "role" USING(role_id) WHERE user_id = $1 LIMIT 1', [user_id])
        return user.rows[0]
    }
    async editUserNames(user_id, data){
        if(data.firstName) await db.query('UPDATE "user" SET first_name = $1 WHERE user_id = $2', [data.firstName, user_id])
        if(data.lastName) await db.query('UPDATE "user" SET last_name = $1 WHERE user_id = $2', [data.lastName, user_id])
        if(data.midName) await db.query('UPDATE "user" SET mid_name = $1 WHERE user_id = $2', [data.midName, user_id])
        return;
    }
    async editUserEmail(user_id, email){
        if(email) await db.query('UPDATE "user" SET email = $1 WHERE user_id = $2', [email, user_id])
        return
    }
    async editUserPassword(user_id, password){
        if(password){
            const passwordHash = bcrypt.hashSync(data.password, 7)
            await db.query('UPDATE "user" SET password_hash = $1 WHERE user_id = $2', [passwordHash, user_id])
        }
        return
    }
    async deleteUser(user_id){
        const deleted = await this.getUser(user_id)
        await db.query('DELETE FROM "user" WHERE user_id = $1', [user_id])
        return deleted
    }
    async getUsers(limit = 100){
        const users = await db.query('SELECT user_id, first_name, last_name, mid_name, email, password_hash, role.name as role FROM "user" JOIN "role" USING(role_id) ORDER BY email LIMIT $1', [limit])
        return users.rows
    }
    async findUser(email){
        const user = await db.query('SELECT user_id, first_name, last_name, mid_name, email, password_hash, role.name as role FROM "user" JOIN "role" USING(role_id) WHERE email = $1 LIMIT 1', [email])
        return user.rows[0]
    }
    async changeRole(user_id, role_id){
        await db.query('UPDATE "user" SET role_id = $1 WHERE user_id = $2', [role_id, user_id])
        return await this.getUser(user_id)
    }
    async checkPassword(email, password){
        const candidate = await db.query('SELECT password_hash from "user" WHERE email = $1', [email])
        return bcrypt.compareSync(password, candidate.rows[0].password_hash)
    }
    async generateAccessToken(email){
        const candidate = await this.findUser(email)
        const payload = {
            user_id: candidate.user_id,
            role: candidate.role
        }
        return jwt.sign(payload, secret, {expiresIn: "24h"})
    }
    async getRoles(){
        const roles = await db.query('SELECT * FROM "role"')
        return roles.rows
    }
    decodeData(token){
        return jwt.verify(token, secret)
    }
}

module.exports = new User()