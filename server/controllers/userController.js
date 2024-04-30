const connection = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const salt = process.env.SALT;
const jwtSecret = process.env.JWT_SECRET;

exports.registerUser = (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword =  bcrypt.hash(password, salt);
        connection.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword], (error, result) => {
            if (error) {
                res.status(500).json({ error: 'Error registering user' });
            } else {
                res.status(201).json({ message: 'User registered successfully' });
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Error registering user' });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        connection.query('SELECT * FROM users WHERE email = ?', email, async (error, results) => {
            if (error || results.length === 0) {
                res.status(401).json({ error: 'Invalid email or password' });
            } else {
                const user = results[0];
                const match = await bcrypt.compare(password, user.password);
                
                if (match) {
                    const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '1h' });
                    res.json({ token });
                } else {
                    res.status(401).json({ error: 'Invalid email or password' });
                }
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Error logging in' });
    }
};

exports.getUserProfile = (req, res) => {
    const {name,username,email}=req.user;
    res.json({user:{name,username,email}});
};
