const express = require('express');
const userController = require('../controllers/userController');
const { userAuthentication } = require('../middlewares/userAuthentication');

const router = express.Router();

// Public route ----
router.post('/register', userController.registerUser);

router.post('/login', userController.loginUser);

// protected route ----
router.get('/profile', userAuthentication, userController.getUserProfile);

module.exports = router;
