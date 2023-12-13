// Контроллер для получения всех пользователей
const bcrypt = require('bcrypt')
const pool = require("../../queries");
const UserService = require('./services/userService')
const LoginService = require('./services/loginService')
const UserDto = require("./userDto");

class UserController {
    async getAllUsers(req, res, next) {
        try {

        } catch (e) {

        }
    }

    async getUser(req, res, next) {
        try {

        } catch (e) {

        }
    }

    async updateUser(req, res, next) {
        try {

        } catch (e) {

        }
    }

    async login(req, res, next) {
        try {
            const tokens = await LoginService.login(req.body)
            res.status(200).json({ refresh: tokens.refreshToken, message: 'Юзер залогинен' })
        } catch (e) {
            next(e);
        }
    }

    async registration(req, res, next) {
        try {
            const tokens = await LoginService.registration(req.body)
            res.status(200).json({ tokens: tokens, message: 'Юзер создан' })
        } catch (e) {
            next(e);
        }
    }

    async access(req, res, next) {
        try {

        } catch (e) {

        }
    }

    async refresh(req, res, next) {
        try {

        } catch (e) {

        }
    }
}

module.exports = new UserController()
