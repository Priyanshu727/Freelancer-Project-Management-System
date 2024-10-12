import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProjectList from './pages/Projects';
import PaymentList from './pages/Payments';
import ProtectedRoute from './routes/ProtectedRoute';

const App = () => {
    return (
        <Router>
            <Navbar />
            <div className="container mx-auto p-4">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/projects" element={<ProjectList />} />
                    <Route path="/payments" element={<PaymentList />} />
                    <Route 
                    path="/projects" 
                    element={
                        <ProtectedRoute>
                            <ProjectList />
                        </ProtectedRoute>
                    } 
                />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
