// /middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token; // Get token from cookies
 
    if (!token) {
       return res.status(401).json({ message: 'Unauthorized. No token provided' });
    }
 
    try {
       const decoded = jwt.verify(token, process.env.JWT_SECRET);
       req.userId = decoded.userId;
       next();
    } catch (error) {
       res.status(401).json({ message: 'Invalid token' });
    }
 };
 ;

module.exports = authMiddleware;
