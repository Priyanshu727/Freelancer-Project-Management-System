// /controllers/paymentController.js
const Payment = require('../models/paymentModel'); // Ensure this path is correct

const createPayment = async (req, res) => {
    const { amount, method, projectId } = req.body;

    try {
        const newPayment = await Payment.create({
            amount,
            method,
            projectId,
            userId: req.user.id, // Assuming you have user info in req.user
        });

        res.status(201).json(newPayment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.find();
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getPaymentById = async (req, res) => {
    const { id } = req.params;
    try {
        const payment = await Payment.findById(id);
        if (!payment) {
            return res.status(404).json({ message: "Payment not found" });
        }
        res.status(200).json(payment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updatePayment = async (req, res) => {
    const { id } = req.params;
    const { amount, method } = req.body;

    try {
        const updatedPayment = await Payment.findByIdAndUpdate(id, { amount, method }, { new: true });
        if (!updatedPayment) {
            return res.status(404).json({ message: "Payment not found" });
        }
        res.status(200).json(updatedPayment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deletePayment = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedPayment = await Payment.findByIdAndDelete(id);
        if (!deletedPayment) {
            return res.status(404).json({ message: "Payment not found" });
        }
        res.status(204).send(); // No content
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Export all the functions
module.exports = {
    createPayment,
    getAllPayments,
    getPaymentById,
    updatePayment,
    deletePayment
};
