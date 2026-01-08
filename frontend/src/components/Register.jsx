import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Register = () => {
    const { register } = useContext(AuthContext);
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Attempting registration with:', formData);
            await register(formData.name, formData.email, formData.password);
        } catch (err) {
             console.error('Registration Error:', err);
             setError(err.response?.data?.error || err.message || 'Registration failed');
        }
    };

    return (
         <div className="flex justify-center items-center h-screen bg-gray-100">
             <form onSubmit={onSubmit} className="bg-white p-8 rounded-2xl shadow-xl w-96 space-y-6">
                <h2 className="text-3xl font-bold text-center text-indigo-600">Create Account</h2>
                 {error && <p className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">{error}</p>}

                 <input 
                    type="text" 
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                />
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
                    Sign Up
                </button>
                <div className="text-center text-sm">
                    Already have an account? <Link to="/login" className="text-indigo-600 font-semibold">Login</Link>
                </div>
            </form>
        </div>
    );
};

export default Register;
