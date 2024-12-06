import React, { useState } from 'react';
import './login.css'; // Importing the custom CSS file
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import frameImage from './Frame.png'; // Importing the image

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
		<div className="login-container">
			<div className="login-card">
				<h2 className="login-title">Login</h2>
				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<label htmlFor="login-user-id" className="form-label">User ID</label>
						<input
							name="username"
							type="text"
							value={formData.username}
							onChange={handleChange}
							required
							className="form-input"
							placeholder="Enter user ID"
						/>
					</div>
					<div className="form-group">
						<label htmlFor="login-password" className="form-label">Password</label>
						<input
							name="password"
							type="password"
							value={formData.password}
							onChange={handleChange}
							required
							className="form-input"
							placeholder="Enter password"
						/>
					</div>
					<button type="submit" className="btn btn-primary">
						Login
					</button>
					<button type="button" onClick={handleRegisterRedirect} className="btn btn-secondary">
						Register
					</button>
				</form>

				{/* Image below the login form */}
				<div className="image-container">
					<img src={frameImage} alt="Your Image" className="center-image" />
				</div>
			</div>
		</div>
	);
}

export default Login;
