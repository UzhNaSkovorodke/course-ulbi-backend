const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'trainy',
    password: 'Kitiu9503',
    port: '5432'
});
module.exports = pool
