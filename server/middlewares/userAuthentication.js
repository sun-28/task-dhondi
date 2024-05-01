const jwt = require('jsonwebtoken');
const connection = require('../db');
const jwtSecret = process.env.JWT_SECRET;
exports.userAuthentication = async (req, res, next) => {
    const token = req.headers.authtoken;
    if (!token) {
        return res.status(401).json({ error: 'Missing token' });
    }
    try {
        const dt = await jwt.verify(token, jwtSecret);
        const results = await new Promise((resolve, reject) => {
            connection.query('SELECT * FROM users WHERE id = ?', dt.userId, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
        if (results.length === 0) {
            return res.status(401).json({ error: 'User not found' });
        }
        req.userId = dt.userId;
        next();
    } catch (error) {
        res.status(401).json({ error: "Invalid Token" });
    }
};
