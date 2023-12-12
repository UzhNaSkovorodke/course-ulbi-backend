const jwt = require('jsonwebtoken')
require('dotenv').config()
class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS, {expiresIn: '5m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH, {expiresIn: '1d'})
        return {
            accessToken, refreshToken
        }
    }

    async saveToken(userId, refreshToken) {

    }
}

module.exports = new TokenService()