import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const apiUrl = 'http://localhost:5001';

// Register Component
function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    age: '',
    gender: '',
    height: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${apiUrl}/register`, formData);
      alert('User registered successfully');
      navigate('/'); // Redirect to workouts
    } catch (error) {
      alert('Registration failed: ' + error.response.data);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-row">
          <div className="form-column">
            <label className="label">Username</label>
            <input
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
              className="input"
            />
          </div>
          <div className="form-column">
            <label className="label">Email</label>
            <input
              name="email"
              placeholder="Email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="input"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-column">
            <label className="label">Password</label>
            <input
              name="password"
              placeholder="Password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="input"
            />
          </div>
          <div className="form-column">
            <label className="label">Age</label>
            <input
              name="age"
              placeholder="Age"
              type="number"
              value={formData.age}
              onChange={handleChange}
              className="input"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-column">
            <label className="label">Gender</label>
            <input
              name="gender"
              placeholder="Gender"
              value={formData.gender}
              onChange={handleChange}
              className="input"
            />
          </div>
          <div className="form-column">
            <label className="label">Height (in cm)</label>
            <input
              name="height"
              placeholder="Height (in cm)"
              type="number"
              value={formData.height}
              onChange={handleChange}
              className="input"
            />
          </div>
        </div>
        <div className="form-column">		
        <button type="submit" className="w-1/2 bg-blue-600 text-white center rounded p-2 mb-4 hover:bg-blue-700">
		  Register
		</button>
        </div>
      </form>
    </div>
  );
}

export default Register;