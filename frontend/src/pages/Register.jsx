import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';

const Register = () => {
    const navigate = useNavigate(); // Initialize the useNavigate hook
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8083/api/auth/register', {
                username,
                email,
                password,
                confirmPassword
            });

            console.log('Registration successful:', response.data);
            navigate('/login'); // Redirect to login page upon successful registration
        } catch (error) {
            console.error('Registration Error:', error.response.data);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form onSubmit={handleRegister} className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-semibold mb-4 text-center">Register</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
                <button
                    type="submit"
                    className="w-full p-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;
