const connection = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { use } = require('../routes/User');

const jwtSecret = process.env.JWT_SECRET;

exports.registerUser = async (req, res) => {
    try {
        const { name, username, password } = req.body;
        console.log(password,typeof(password))
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        connection.query('INSERT INTO users (name, username, password) VALUES (?, ?, ?)', [name, username, hashedPassword], (error) => {
            if (error) {
                res.status(500).json({ success: false, message: 'Error registering user' });
            } else {
                res.status(201).json({ success: true, message: 'User registered successfully' });
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error registering user' });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        connection.query('SELECT * FROM users WHERE username = ?', username, async (error, results) => {
            if (error || results.length === 0) {
                res.status(401).json({ success: false, message: 'Invalid username or password' });
            } else {
                const user = results[0];
                const match = await bcrypt.compare(password, user.password);
                
                if (match) {
                    const token = jwt.sign({ userId: user.id }, jwtSecret);
                    res.json({ success: true, token });
                } else {
                    res.status(401).json({ success: false, message: 'Invalid username or password' });
                }
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error logging in' });
    }
};

exports.getUserProfile = (req, res) => {
    const userId = req.userId;
    connection.query('SELECT id, name, username FROM users WHERE id = ?', userId, (error, results) => {
        if (error) {
            res.status(500).json({ success: false, error: 'Error retrieving user' });
        } else {
            const {id,name,username} = results[0];
            res.json({ success: true, user: {id,name,username} });
        }
    });
};
