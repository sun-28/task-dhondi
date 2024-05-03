const connection = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { use } = require('../routes/User');

const jwtSecret = process.env.JWT_SECRET;

exports.registerUser = async (req, res) => {
    try {
        const { name, username, password ,image} = req.body;
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        connection.query('INSERT INTO users (name, username, password,image) VALUES (?, ?, ?,?)', [name, username, hashedPassword,image], (error) => {
            if (error) {
                console.log(error)
                //
                res.json({ success: false, message: error.code === 'ER_DUP_ENTRY' ? 'Username already exists' : 'Error registering user'});
            } else {
                res.json({ success: true, message: 'User registered successfully' });
            }
        });
    } catch (error) {
        res.json({ success: false, message: 'Error registering user' });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        connection.query('SELECT * FROM users WHERE username = ?', username, async (error, results) => {
            if (error || results.length === 0) {
                res.json({ success: false, message: 'Invalid username or password' });
            } else {
                const user = results[0];
                const match = await bcrypt.compare(password, user.password);
                
                if (match) {
                    const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '1h' });
                    res.json({ success: true, token });
                } else {
                    res.json({ success: false, message: 'Invalid username or password' });
                }
            }
        });
    } catch (error) {
        res.json({ success: false, message: 'Error logging in' });
    }
};

exports.getUserProfile = (req, res) => {
    const userId = req.userId;
    connection.query('SELECT id, name, username , image FROM users WHERE id = ?', userId, (error, results) => {
        if (error) {
            res.json({ success: false, error: 'Error retrieving user' });
        } else {
            const {id,name,username,image} = results[0];
            res.json({ success: true, user: {id,name,username,image} });
        }
    });
};
