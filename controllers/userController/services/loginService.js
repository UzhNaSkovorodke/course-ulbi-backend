const UserService = require('./userService')
const TokenService = require('./tokenService')
const bcrypt = require('bcrypt')
const pool = require("../../../queries");
const uuid = require('uuid')

class LoginService {
    async checkPassword(credentials, password) {
        const storedPassword = credentials.password
        const isPasswordMatch = await bcrypt.compare(password, storedPassword);
        if (!isPasswordMatch) throw new Error('Пароль веден неверно');
    }

    async checkUsername(credentials, username) {
        const storedUsername = credentials.username
        const isUsernameMatch = username === storedUsername
        if (!isUsernameMatch) throw new Error('Имя пользователя ведено неверно');
    }

    async registration(userData) {
        const {username, password, email} = userData

        try {
            const userByMail = await UserService.getByEmail(email)
            if (userByMail.length > 0) {
                throw new Error('Пользователь с таким адресом уже существует');
            }
            const hashPassword = await bcrypt.hash(password, 3)
            const user = await UserService.create({email, password: hashPassword, username})
            const lastIdResult = await pool.query('SELECT MAX(id) AS lastId FROM tokens');
            const lastId = lastIdResult.rows[0].lastid ? lastIdResult.rows[0].lastid + 1 : '1';

            const tokens = TokenService.generateTokens({username, password, email})
            await pool.query('INSERT INTO tokens (id, userid, jwt, refresh) VALUES ($1, $2, $3, $4)', [lastId, user.id, tokens.accessToken, tokens.refreshToken]);
        } catch (e) {
            console.log(e)
            throw e;
        }
    }

    async login({username, password, email}) {
        try {
            const storedCredential = await pool.query('SELECT * FROM users WHERE email = $1', [email]).then((data) => data.rows)
            if (storedCredential.length === 0) throw new Error('Пользователь с таким адресом не существует');
            await this.checkPassword(storedCredential[0], password)
            await this.checkUsername(storedCredential[0], username)

            const tokens = TokenService.generateTokens({username, password, email})
        } catch (e) {
            throw e;
        }
    }


}

module.exports = new LoginService()
