const mysql = require('mysql');
require('dotenv').config()

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: process.env.DB_USER,
    password: process.env.DB_PASS
});

module.exports = connection;
