// /models/userModel.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator'); // Import the validator library

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true, // Remove whitespace from both ends
        minlength: 3, // Minimum length for username
        maxlength: 30 // Maximum length for username
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true, // Store email in lowercase
        validate: [validator.isEmail, 'Please fill a valid email address'], // Email format validation
    },
    password: {
        type: String,
        required: true,
        minlength: 6, // Minimum length for password
    },
}, { timestamps: true });

// Method to match passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Middleware to hash passwords before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
