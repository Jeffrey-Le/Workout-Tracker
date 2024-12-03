import React from 'react';
import { useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import { Activity, LogOut, User, BarChart2, Search as SearchIcon } from 'lucide-react';

import Dashboard from './pages/dashboard'; 
import LogWorkout from './pages/log_workout';
import SearchPage from './pages/search';

import './styles.css';
import Profile from './pages/profile';

import AuthService from './services/auth';
import Login from './pages/login';
import Register from './pages/register';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
      return <Navigate to="/login" replace />;
  }
  return children;
};

// Create a wrapper component for the sidebar to use useNavigate
const Sidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
      // AuthService.logout();
      localStorage.removeItem('authToken');
      navigate('/login');
    };

    useEffect(() => {
      // For development only
      if (!AuthService.isAuthenticated()) {
        AuthService.login('dummyuser');
      }
    }, []);

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
            <SearchIcon className="icon" />
            <span>Search</span>
          </Link>
        </nav>
  
        <button className="logout-btn" onClick={handleLogout}>
          <LogOut className="icon" />
          <span>Log Out</span>
        </button>
      </div>
    );
  };
  
  const App = () => {
    return (
      <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
                <Route path="*" element={
                    <ProtectedRoute>
                        {/* existing dashboard component */}
                        <div className="flex min-h-screen bg-slate-900 text-white">
                            <Sidebar />
                            <div className="main-content">
                                <Routes>
                                    <Route path="/" element={<Dashboard />} />
                                    <Route path="/log-workout" element={<LogWorkout />} />
                                    <Route path="/profile" element={<Profile />} />
                                    <Route path="/search" element={<SearchPage />} />
                                </Routes>
                            </div>
                        </div>
                    </ProtectedRoute>
                  }
                />
            </Routes>
        </Router>
    );
  };
  

export default App;

