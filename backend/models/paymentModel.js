// /models/paymentModel.js
const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    method: {
        type: String,
        required: true,
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Project', // Assuming you have a Project model
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;
