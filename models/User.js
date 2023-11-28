const db = require('../util/Database')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {secret} = require('../config/jwtSecret')

class User{
    async CreateUser(data){
        const passwordHash = bcrypt.hashSync(data.password, 7)
        const userId = await db.query('INSERT INTO "user"(first_name, last_name, mid_name, email, password_hash) VALUES ($1, $2, $3, $4, $5) RETURNING user_id', [data.firstName, data.lastName, data.midName, data.email, passwordHash])

        return await this.GetUser(userId.rows[0].user_id)
    }

    async GetUser(userId){
        const user = await db.query('SELECT user_id, first_name, last_name, mid_name, email, password_hash, role.name as role FROM "user" JOIN "role" USING(role_id) WHERE user_id = $1 LIMIT 1', [userId])
        return user.rows[0]
    }
    async GetUsers(limit = 100){
        const users = await db.query('SELECT user_id, first_name, last_name, mid_name, email, password_hash, role.name as role FROM "user" JOIN "role" USING(role_id) LIMIT $1', [limit])
        return users.rows
    }
    async FindUser(email){
        const user = await db.query('SELECT user_id, first_name, last_name, mid_name, email, password_hash, role.name as role FROM "user" JOIN "role" USING(role_id) WHERE email = $1 LIMIT 1', [email])
        return user.rows[0]
    }
    async GetRoles(){
        const roles = await db.query('SELECT * FROM "role"')
        return roles.rows
    }
    async GetRole(roleId){
        const role = await db.query('SELECT * FROM "role" WHERE role_id = $1 LIMIT 1', [roleId])
        return role.rows[0]
    }

    async EditUser(userId, data){
        if(data.firstName) await db.query('UPDATE "user" SET first_name = $1 WHERE user_id = $2', [data.firstName, userId])
        if(data.lastName) await db.query('UPDATE "user" SET last_name = $1 WHERE user_id = $2', [data.lastName, userId])
        if(data.midName) await db.query('UPDATE "user" SET mid_name = $1 WHERE user_id = $2', [data.midName, userId])
        if(data.email) await db.query('UPDATE "user" SET email = $1 WHERE user_id = $2', [data.email, userId])
        if(data.password){
            const passwordHash = bcrypt.hashSync(data.password, 7)
            await db.query('UPDATE "user" SET password_hash = $1 WHERE user_id = $2', [passwordHash, userId])
        }
        if(data.roleId) await db.query('UPDATE "user" SET role_id = $1 WHERE user_id = $2', [data.roleId, userId])
        return await this.GetUser(userId)
    }

    async DeleteUser(userId){
        const deleted = await this.GetUser(userId)
        await db.query('DELETE FROM "user" WHERE user_id = $1', [userId])
        return deleted
    }

    async CheckPassword(email, password){
        const candidate = await db.query('SELECT password_hash from "user" WHERE email = $1', [email])
        return bcrypt.compareSync(password, candidate.rows[0].password_hash)
    }
    async GenerateAccessToken(email){
        const candidate = await this.FindUser(email)
        const payload = {
            userId: candidate.user_id,
            role: candidate.role
        }
        return jwt.sign(payload, secret, {expiresIn: "24h"})
    }
    DecodeData(token){
        return jwt.verify(token, secret)
    }
}

module.exports = new User()