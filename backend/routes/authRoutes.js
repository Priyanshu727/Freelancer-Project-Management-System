const express = require('express');
const { register, login, getProfile } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Register route
router.post('/register', register);

// Login route
router.post('/login', login);

// Profile route (protected)
router.get('/profile', authMiddleware, getProfile);

module.exports = router;
