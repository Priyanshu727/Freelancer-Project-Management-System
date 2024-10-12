import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between">
                <Link to="/" className="text-white">Home</Link>
                <div>
                    <Link to="/login" className="text-white mx-2">Login</Link>
                    <Link to="/register" className="text-white mx-2">Register</Link>
                    <Link to="/projects" className="text-white mx-2">Projects</Link>
                    <Link to="/payments" className="text-white mx-2">Payments</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
