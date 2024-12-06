import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const apiUrl = 'http://localhost:5001';

// Login Component
function Login({ setToken }) {
	const [formData, setFormData] = useState({ username: '', password: '' }); 
	const navigate = useNavigate();
  
	const handleChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(`${apiUrl}/login`, formData);
			localStorage.setItem('token', response.data.token);
			alert('Login successful');
			navigate('/'); // Redirect to dashboard
		} catch (error) {
			alert('Login failed: ' + error.response.data);
		}
	};
	
	const handleRegisterRedirect = () => {
		navigate('/register'); // Navigate to the register page
	};

    return (
        <div className="flex min-h-screen bg-slate-900 text-white items-center justify-center">
            <div className="w-full max-w-md p-8 bg-slate-800 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="login-user-id" className="block mb-2">User ID</label>
                        <input
                            name="username"
                            type="text"
                            value={formData.username}
                            onChange={handleChange}
							required
                            className="w-full p-2 rounded bg-slate-700 text-white"
                            placeholder="Enter user ID"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="login-password" className="block mb-2">Password</label>
                        <input
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
							required
                            className="w-full p-2 rounded bg-slate-700 text-white"
                            placeholder="Enter password"
                        />
                    </div>
					<button
						type="submit"
						className="w-full bg-blue-600 text-white rounded p-2 mb-4 hover:bg-blue-700"
					>
						Login
					</button>	
					<button 
						type="button" onClick={handleRegisterRedirect} className="w-full bg-blue-600 text-white rounded p-2 hover:bg-blue-700">
						Register
					</button>
                </form>
            </div>
        </div>
    );
};

export default Login;