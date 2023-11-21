
// Контроллер для получения всех пользователей
const pool = require("../queries");

const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

// Контроллер для получения пользователя по id
const getUserById = (request, response) => {
    const id = parseInt(request.params.id);
    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

// Контроллер для создания нового пользователя
const createUser = (request, response) => {
    const { name, password, email } = request.body;
    pool.query('INSERT INTO users (name, password, email) VALUES ($1, $2, $3)', [name, password, email], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(201).send('User created successfully');
    });
};

// Контроллер для обновления пользователя по id
const updateUser = (request, response) => {
    const id = parseInt(request.params.id);
    const { name, email } = request.body;
    pool.query(
        'UPDATE users SET name = $1, email = $2 WHERE id = $3',
        [name, email, id],
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).send('User updated successfully');
        }
    );
};

// Контроллер для удаления пользователя по id
const deleteUser = (request, response) => {
    const id = parseInt(request.params.id);
    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).send('User deleted successfully');
    });
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};
