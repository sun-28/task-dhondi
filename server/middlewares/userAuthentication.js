const jwt = require('jsonwebtoken');
const connection = require('../db');
const jwtSecret = process.env.JWT_SECRET;

exports.userAuthentication = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Missing token' });
    }

    jwt.verify(token, jwtSecret, (err, decodedToken) => {
        if (err) {
            return res.status(401).json({ error: 'Invalid token' });
        }

        const userId = decodedToken.userId;
        connection.query('SELECT * FROM users WHERE id = ?', userId, (error, results) => {
            if (error || results.length === 0) {
                return res.status(401).json({ error: 'User not found' });
            }

            req.user = results[0];
            next();
        });
    });
};
