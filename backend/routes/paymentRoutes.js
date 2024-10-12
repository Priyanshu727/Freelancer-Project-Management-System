// /routes/paymentRoutes.js
const express = require('express');
const {
    createPayment,
    getAllPayments,
    getPaymentById,
    updatePayment,
    deletePayment
} = require('../controllers/paymentController'); // Ensure this path is correct
const authMiddleware = require('../middleware/authMiddleware'); // Ensure this path is correct

const router = express.Router();

// Protect these routes with authMiddleware
router.post('/', authMiddleware, createPayment); // POST /api/payments
router.get('/', authMiddleware, getAllPayments); // GET /api/payments
router.get('/:id', authMiddleware, getPaymentById); // GET /api/payments/:id
router.put('/:id', authMiddleware, updatePayment); // PUT /api/payments/:id
router.delete('/:id', authMiddleware, deletePayment); // DELETE /api/payments/:id

module.exports = router;
