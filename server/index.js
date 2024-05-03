const express = require('express')
const cors = require('cors');
const mysql = require('mysql');
require('dotenv').config()
const connection = require('./db')

const app = express();

app.use(express.json())
app.use(cors())
app.use('/user',require('./routes/User'))
app.use('/post',require('./routes/Post'))



connection.connect((error) => {
    if (error) {
        console.error('Error connecting to MySQL server: ' + error.stack);
        return;
    }
    console.log('Connected to MySQL server');
    connection.query('CREATE DATABASE IF NOT EXISTS blog_app', (error) => {
        if (error) {
            console.error('Error creating database: ' + error.stack);
            return;
        }
        connection.changeUser({ database: 'blog_app' }, (error) => {
            if (error) {
                console.error('Error changing database: ' + error.stack);
                return;
            }
            connection.query(`
                CREATE TABLE IF NOT EXISTS users (
                    id INT PRIMARY KEY AUTO_INCREMENT,
                    name VARCHAR(255) NOT NULL,
                    username VARCHAR(255) NOT NULL UNIQUE,
                    image VARCHAR(255),
                    password VARCHAR(255) NOT NULL
                )
            `, (error) => {
                if (error) {
                    console.error('Error creating users table: ' + error.stack);
                    return;
                }

                connection.query(`
                    CREATE TABLE IF NOT EXISTS posts (
                        id INT PRIMARY KEY AUTO_INCREMENT,
                        title VARCHAR(255) NOT NULL,
                        content TEXT NOT NULL,
                        tags JSON,
                        user_id INT,
                        FOREIGN KEY (user_id) REFERENCES users(id),
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                    )
                `, (error) => {
                    if (error) {
                        console.error('Error creating posts table: ' + error.stack);
                        return;
                    }
                    app.listen(5000, () => {
                        console.log('Server Running on PORT 5000')
                    });
                });
            });
        });
    });
});
