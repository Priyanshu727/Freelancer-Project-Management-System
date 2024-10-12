import React, { useState } from 'react';
// Ensure React is imported
import axios from 'axios';

const PaymentForm = ({ refreshPayments }) => {
    const [project, setProject] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        try {
            await axios.post('/api/payments', { project, amount, date }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            refreshPayments(); // Refresh the payment list after submission
            setProject('');
            setAmount('');
            setDate('');
        } catch (error) {
            console.error(error);
            alert('Failed to create payment.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
            <h2 className="text-2xl mb-4">Create Payment</h2>
            <input 
                type="text" 
                placeholder="Project ID" 
                value={project} 
                onChange={(e) => setProject(e.target.value)} 
                className="border mb-4 p-2 w-full" 
                required 
            />
            <input 
                type="number" 
                placeholder="Amount" 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)} 
                className="border mb-4 p-2 w-full" 
                required 
            />
            <input 
                type="date" 
                value={date} 
                onChange={(e) => setDate(e.target.value)} 
                className="border mb-4 p-2 w-full" 
                required 
            />
            <button type="submit" className="bg-blue-500 text-white p-2 w-full">
                Create Payment
            </button>
        </form>
    );
};

export default PaymentForm;
