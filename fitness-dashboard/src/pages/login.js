import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/auth';

const Login = () => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        
        if (userId && password) {
            try {
                const response = await fetch('http://localhost:5000/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: userId,
                        password: password,
                    }),
                });

                if (response.ok) {
                    const data = await response.json();
                    const token = data.token;
                    localStorage.setItem('authToken', token);
                    alert('Login successful!');
                    navigate('/'); // Redirect to dashboard
                } else if (response.status === 401) {
                    alert('Invalid username or password.');
                } else {
                    alert('Login failed. Please try again.');
                }
            } catch (error) {
                console.error('Error during login:', error);
                alert('An unexpected error occurred.');
            }
        } else {
            alert('Please fill in all fields.');
        }
    };

    return (
        <div className="flex min-h-screen bg-slate-900 text-white items-center justify-center">
            <div className="w-full max-w-md p-8 bg-slate-800 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label htmlFor="login-user-id" className="block mb-2">User ID</label>
                        <input
                            id="login-user-id"
                            type="text"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            className="w-full p-2 rounded bg-slate-700 text-white"
                            placeholder="Enter user ID"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="login-password" className="block mb-2">Password</label>
                        <input
                            id="login-password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 rounded bg-slate-700 text-white"
                            placeholder="Enter password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white rounded p-2 hover:bg-blue-700"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;