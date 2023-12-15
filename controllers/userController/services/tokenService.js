const jwt = require('jsonwebtoken')
const pool = require("../../../queries");
const ApiError = require('../../../exceptions/api-error')
require('dotenv').config()

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS, {expiresIn: '5m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH, {expiresIn: '1d'})
        return {
            accessToken, refreshToken
        }
    }

    async saveToken(userId, tokens) {
        const lastIdResult = await pool.query('SELECT MAX(id) FROM tokens');
        const lastId = lastIdResult.rows[0].max ? lastIdResult.rows[0].max + 1 : '1';
        await pool.query('INSERT INTO tokens (id, userid, access, refresh) VALUES ($1, $2, $3, $4)', [lastId, userId, tokens.accessToken, tokens.refreshToken]);
    }

    async saveAccess(userId, access) {
        const lastIdResult = await pool.query('SELECT MAX(id) FROM tokens');
        const lastId = lastIdResult.rows[0].max ? lastIdResult.rows[0].max + 1 : '1';
        await pool.query('INSERT INTO tokens (acess) VALUES ($1)', [lastId, userId, tokens.accessToken, tokens.refreshToken]);
    }

    async updateToken(tokens, userid) {
        try {
            const currentTokens = await pool.query('SELECT * FROM tokens WHERE userid = $1', [userid]).then((data) => data.rows)
            if (currentTokens.length === 0) {
                // Если строка не найдена, выводим ошибку
                throw ApiError.BadRequest('Строка с токенами не найдена')
            }
            await pool.query('UPDATE tokens SET access = $1, refresh = $2 WHERE userid = $3', [tokens.accessToken, tokens.refreshToken, userid])
        } catch (e) {
            throw e
        }
    }
}

module.exports = new TokenService()