import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PaymentForm from './PaymentForm';

const PaymentList = () => {
    const [payments, setPayments] = useState([]);

    const fetchPayments = async () => {
        const token = localStorage.getItem('token');

        try {
            const response = await axios.get('/api/payments', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setPayments(response.data);
        } catch (error) {
            console.error(error);
            alert('Failed to fetch payments.');
        }
    };

    useEffect(() => {
        fetchPayments();
    }, []);

    return (
        <div>
            <PaymentForm refreshPayments={fetchPayments} />
            <h2 className="text-2xl mt-4">Payments</h2>
            <ul className="mt-4">
                {payments.map((payment) => (
                    <li key={payment._id} className="border-b py-2">
                        <p>Project ID: {payment.project}</p>
                        <p>Amount: {payment.amount}</p>
                        <p>Date: {payment.date}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PaymentList;
