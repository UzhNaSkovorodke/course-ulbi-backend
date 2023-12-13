const UserService = require('./userService')
const TokenService = require('./tokenService')
const bcrypt = require('bcrypt')
const pool = require("../../../queries");
const ApiError = require("../../../exceptions/api-error");

class LoginService {
    async checkPassword(credentials, password) {
        const storedPassword = credentials.password
        const isPasswordMatch = await bcrypt.compare(password, storedPassword);
        if (!isPasswordMatch) throw ApiError.BadRequest('Пароль веден неверно');
    }

    async checkUsername(credentials, username) {
        const storedUsername = credentials.username
        const isUsernameMatch = username === storedUsername
        if (!isUsernameMatch) ApiError.BadRequest('Имя пользователя ведено неверно');
    }

    async registration(userData) {
        const {username, password, email} = userData
        try {
            const userByMail = await UserService.getByEmail(email)
            if (userByMail.length > 0) {
                throw ApiError.BadRequest('Пользователь с таким адресом уже существует');
            }
            const hashPassword = await bcrypt.hash(password, 3)
            const user = await UserService.create({email, password: hashPassword, username})

            const tokens = TokenService.generateTokens({username, password, email})
            await TokenService.saveToken(user.id, tokens)
            return tokens
        } catch (e) {
            throw ApiError.BadRequest(e);
        }
    }

    async login({username, password, email}) {
        try {
            const storedCredential = await pool.query('SELECT * FROM users WHERE email = $1', [email]).then((data) => data.rows)
            if (storedCredential.length === 0) throw ApiError.BadRequest('Пользователь с таким адресом не существует');
            await this.checkPassword(storedCredential[0], password)
            await this.checkUsername(storedCredential[0], username)

            const tokens = TokenService.generateTokens({username, password, email})
            await TokenService.updateToken(tokens, storedCredential[0].id)
            return tokens
        } catch (e) {
            throw e;
        }
    }

    async checkJwtRefresh(userId, refreshToken) {
        try {

        } catch (e) {
            throw ApiError.BadRequest(e)
        }
    }

    async checkAccessJwt(userId, accessToken) {
        try {

        } catch (e) {
            throw ApiError.BadRequest(e)
        }
    }

}

module.exports = new LoginService()
