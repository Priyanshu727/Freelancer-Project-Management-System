const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

// Mocked user database
const users = [];

// Register user
exports.register = async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;

    // Check if all fields are provided
    if (!username || !email || !password || !confirmPassword) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = new User({ username, email, password });
        await user.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};
// Login user
exports.login = async (req, res) => {
    const { email, password } = req.body;

    // Validate input data
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    try {
        const user = await User.findOne({ email });
        
        // Check if user exists and validate password
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate a JWT token with user ID and other claims as needed
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Set the token in a cookie with additional options
        res.cookie('token', token, {
            httpOnly: true,      // Prevent client-side JavaScript from accessing the cookie
            secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
            maxAge: 3600000,    // 1 hour expiration
            sameSite: 'Strict'   // Helps mitigate CSRF attacks
        });

        // Optionally, return user information (excluding sensitive data)
        const { password: _, ...userInfo } = user._doc; // Exclude password from user info

        res.status(200).json({
            message: 'Login successful',
            user: userInfo // Return user info if needed
        });
    } catch (error) {
        console.error('Login error:', error); // Log the error for debugging
        res.status(500).json({ message: 'Server error' });
    }
};

// Protected route example
exports.getProfile = async (req, res) => {
    try {
        const userId = req.user.id; // Get the user ID from the JWT
        console.log('User ID from token:', userId); // Debugging line

        const user = await User.findById(userId).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

