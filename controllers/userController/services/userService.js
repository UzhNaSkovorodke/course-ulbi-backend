const pool = require("../../../queries");

class UserService {
    async getAll() {

    }

    async get() {

    }

    async getByEmail(email) {
        pool.query('SELECT * FROM users WHERE email = $1', [email], (error, results) => {
            if (error) {
                throw error;
            }
            return results?.rows
        });
    }

    async update() {

    }

    async create() {

    }
}

module.exports = new UserService()