import React, { useState } from 'react';
import './register.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import frameImage from './Frame.png';

const apiUrl = 'http://localhost:5001';

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${apiUrl}/register`, formData);
      alert('User registered successfully');
      navigate('/login');
    } catch (error) {
      alert('Registration failed: ' + (error.response?.data || 'Unknown error'));
    }
  };

  return (
    <div className="form-container">
      {/* Remove duplicate form-container class from form */}
      <form onSubmit={handleSubmit}>
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
          <button type="submit" className="button">
            Register
          </button>
        </div>
      </form>
      
      {/* Image below the login form */}
      <div className="image-container2">
        <img src={frameImage} alt="Your Image" className="center-image2" />
      </div>
    </div>
  );
}

export default Register;