import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Activity, Bike, LogOut, User, Calendar, Clock, BarChart2 } from 'lucide-react';

import Dashboard from './pages/dashboard'; 
import LogWorkout from './pages/log_workout';
import Search from './pages/search';
import Profile from './pages/profile';

import './styles.css';

// Create a wrapper component for the sidebar to use useNavigate
const Sidebar = () => {
    const navigate = useNavigate();
    return (
      <div className="sidebar">
        <div className="logo">
          <div className="logo-icon">
            <Activity className="icon" />
          </div>
        </div>
        
        <button 
          className="add-workout-btn"
          onClick={() => navigate('/log-workout')}
        >
          Add Workout
        </button>
  
        <nav className="nav">
          <Link to="/" className="nav-item">
            <BarChart2 className="icon" />
            <span>Dashboard</span>
          </Link>
          <Link to="/profile" className="nav-item">
            <User className="icon" />
            <span>Profile</span>
          </Link>
          <Link to="/search" className="nav-item">
            <Clock className="icon" />
            <span>Search</span>
          </Link>
        </nav>
  
        <button className="logout-btn">
          <LogOut className="icon" />
          <span>Log Out</span>
        </button>
      </div>
    );
  };
  
  const App = () => {
    return (
      <Router>
        <div className="flex min-h-screen bg-slate-900 text-white">
          <Sidebar />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/log-workout" element={<LogWorkout />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/search" element={<Search />} />
            </Routes>
          </div>
        </div>
      </Router>
    );
  };
  

export default App;
