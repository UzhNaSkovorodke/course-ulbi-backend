const pool = require("../../../queries");

class UserService {
    async getAll() {

    }

    async get() {

    }

    async getByEmail(email) {
        try {
            const currentEmail = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
            return currentEmail?.rows;
        } catch (error) {
            throw error;
        }
    }

    async update() {

    }

    async create(userData) {
        try {
            const {username, password, email} = userData
            const lastIdResult = await pool.query('SELECT MAX(id) AS lastId FROM users');

            const lastId = lastIdResult.rows[0].lastid;
            const newUser = {
                id: lastId + 1,
                username: username,
                password: password,
                email: email
            };
           await pool.query('INSERT INTO users (id, username, password, email) VALUES ($1, $2, $3, $4)', [newUser.id, newUser.username, newUser.password, newUser.email]);

           return newUser
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new UserService()