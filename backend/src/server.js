// /src/server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('../config/db.js'); // Ensure this path is correct
const authRoutes = require('../routes/authRoutes.js'); // Ensure this path is correct
const projectRoutes = require('../routes/projectRoutes.js'); // Ensure this path is correct
const paymentRoutes = require('../routes/paymentRoutes.js'); // Ensure this path is correct

// Load environment variables from the `.env` file
dotenv.config();

// Connect to MongoDB
connectDB();

// Log to check if variables are loaded
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser()); 

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/payments', paymentRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal Server Error" });
});

// Define the port
const PORT = process.env.PORT || 8083;

// Start the server
app.listen(PORT, (err) => {
    if (err) {
        console.log(err, 'Server failed to start');
    } else {
        console.log(`Listening on port: http://localhost:${PORT}`);
    }
});
