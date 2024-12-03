import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './log_workout.css';

const apiUrl = 'http://localhost:5001/api';

const LogWorkout = () => {
  const navigate = useNavigate();
  const [workoutData, setWorkoutData] = useState({
    workoutType: '',
    duration: '',
    distance: '',
    calories: '0',
    details: '', // Renamed from 'notes' to 'details'
    workoutDate: new Date().toISOString().split('T')[0], // Set to today's date
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWorkoutData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Disable form while loading
    setLoading(true);

    try {
      // Retrieve the token from localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        alert('No token found. Please log in again.');
        setLoading(false);
        return;
      }

      // Prepare data to send
      const dataToSend = {
        ...workoutData,
        workoutDate: workoutData.workoutDate || new Date().toISOString().split('T')[0],
      };

      // API request to log workout
      await axios.post(`${apiUrl}/workouts/add`, dataToSend, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Notify success
      alert('Workout logged successfully!');
      navigate('/'); // Redirect to dashboard
    } catch (error) {
      console.error('Error logging workout:', error);
      alert('Failed to log workout. Please try again.');
    } finally {
      setLoading(false); // Re-enable form
    }
  };

  return (
    <>
      <div className="header">
        <h1 className="today-date-text">Today, {new Date().toLocaleDateString()}</h1>
        <h2 className="header-text">New Entry</h2>
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-row">
            <div className="form-column">
              <label className="label">Workout</label>
              <select
                name="workoutType"
                value={workoutData.workoutType}
                onChange={handleChange}
                className="select"
                disabled={loading} // Disable form while loading
              >
                <option value="">Select Type</option>
                <option value="Run">Run</option>
                <option value="Cycling">Cycling</option>
                <option value="Swimming">Swimming</option>
                <option value="Yoga">Yoga</option>
              </select>
            </div>

            <div className="form-column">
              <label className="label">Time (minutes)</label>
              <input
                type="number"
                name="duration"
                value={workoutData.duration}
                onChange={handleChange}
                className="input"
                disabled={loading} // Disable form while loading
              />
            </div>

            <div className="form-column">
              <label className="label">Distance (miles)</label>
              <input
                type="number"
                name="distance"
                value={workoutData.distance}
                onChange={handleChange}
                className="input"
                disabled={loading} // Disable form while loading
              />
            </div>
          </div>

          {/* Second row */}
          <div className="form-row-description">
            <label className="label">Description:</label>
            <textarea
              name="details"
              value={workoutData.details}
              onChange={handleChange}
              className="input"
              rows="4"
              disabled={loading} // Disable form while loading
            />
          </div>

          <div className="form-row">
            <div className="form-column">
              <button
                type="button"
                className="cancel-button"
                onClick={() => navigate('/')}
                disabled={loading}
              >
                Cancel
              </button>
            </div>
            <div className="form-column">
              <button
                type="submit"
                className="create-button"
                disabled={loading}
              >
                {loading ? 'Logging...' : 'Create'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default LogWorkout;
