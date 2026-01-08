import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Attempting login with:', formData.email);
            await login(formData.email, formData.password);
            console.log('Login successful');
            navigate('/');
        } catch (err) {
            console.error('Login Error:', err);
            setError(err.response?.data?.error || 'Login failed');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
             <form onSubmit={onSubmit} className="bg-white p-8 rounded-2xl shadow-xl w-96 space-y-6">
                <h2 className="text-3xl font-bold text-center text-indigo-600">Welcome Back</h2>
                {error && <p className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">{error}</p>}
                
                <input 
                    type="email" 
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                />
                 <input 
                    type="password" 
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                />
                
                <button 
                    type="submit" 
                    className="w-full bg-indigo-600 text-white p-3 rounded-lg font-bold hover:bg-indigo-700 transition-colors"
                >
                    Login
                </button>
                <div className="text-center text-sm">
                    Don't have an account? <Link to="/register" className="text-indigo-600 font-semibold">Register</Link>
                </div>
            </form>
        </div>
    );
};

export default Login;
