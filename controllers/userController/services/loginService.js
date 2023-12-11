const UserService = require('./userService')
class LoginService {
    async registration(email, password) {
        const user = await UserService.getByEmail(email)
        if (user[0]) {
            throw new Error('Пользователь с таким адрессом уже существует')
        }
    }
}

module.exports = new LoginService()
