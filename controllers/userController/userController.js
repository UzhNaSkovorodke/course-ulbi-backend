// Контроллер для получения всех пользователей
const bcrypt = require('bcrypt')
const pool = require("../../queries");
const UserService = require('./services/userService')
const LoginService = require('./services/loginService')

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
            await LoginService.login(req.body)
            res.status(200).json('Юзер залогинен')
        } catch (e) {
            res.status(404).json(e);
        }
    }

    async registration(req, res, next) {
        try {
            await LoginService.registration(req.body)
            res.status(200).json('Создан юзер')
        } catch (e) {
            res.status(404).json(e);
        }
    }

    async getToken(req, res, next) {
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
