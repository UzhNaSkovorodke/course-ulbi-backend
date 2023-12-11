//Контроллер для логина
const pool = require("../queries");

const loginUser = (request, response, next) => {
    console.log(require('crypto').randomBytes(64).toString('hex'))
    const {username, password, email} = request.body;

    const checkCredentials = (results) => {
        const tryEmail = results[0].email;
        const tryPassword = results[0].password;

        return password === tryPassword && email === tryEmail;
    };

    pool.query('SELECT * FROM users WHERE username = $1', [username], (error, results) => {
        if (error) {
            throw error;
        }

        if (results.rows.length > 0 && checkCredentials(results.rows)) {
            response.status(200).json("Логин был");
        } else {
            response.status(404).json("логина не было");
        }
    });
};

module.exports = {
    loginUser
};
