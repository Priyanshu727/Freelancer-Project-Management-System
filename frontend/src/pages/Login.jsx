import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8083/api/auth/login', {
                email,
                password
            });

            console.log('Login successful:', response.data);
            // Store the token or user information in local storage or context
            localStorage.setItem('token', response.data.token); // Assuming your backend sends a token
            navigate('/projects'); // Redirect to the project list page
        } catch (error) {
            console.error('Login Error:', error.response.data);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md">
                <h2 className="text-2xl mb-4">Login</h2>
                <input
                    type="email" // Changed to email for better input validation
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border mb-4 p-2 w-full"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border mb-4 p-2 w-full"
                    required
                />
                <button type="submit" className="bg-blue-500 text-white p-2 w-full">Login</button>
            </form>
        </div>
    );
};

export default Login;
