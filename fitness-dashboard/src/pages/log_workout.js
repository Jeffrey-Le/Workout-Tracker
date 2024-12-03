import React, { useState, useEffect } from 'react';
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
    calories: '',
    details: '',
    workoutDate: new Date().toISOString().split('T')[0],
  });

  const [loading, setLoading] = useState(false);
  const [workoutTypes, setWorkoutTypes] = useState([]);

  useEffect(() => {
    const fetchWorkoutTypes = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${apiUrl}/workouts/types`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setWorkoutTypes(response.data);
      } catch (error) {
        console.error('Error fetching workout types:', error);
        // If fetching types fails, you can set default types
        setWorkoutTypes(['Run', 'Cycling', 'Swimming', 'Yoga']);
      }
    };

    fetchWorkoutTypes();
  }, []);

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
        workout_type: workoutData.workoutType,
        duration: workoutData.duration ? parseFloat(workoutData.duration) : null,
        distance: workoutData.distance ? parseFloat(workoutData.distance) : null,
        calories_burned: workoutData.calories ? parseFloat(workoutData.calories) : null,
        details: workoutData.details || null,
        workout_date: workoutData.workoutDate || new Date().toISOString().split('T')[0],
      };

      // API request to log workout
      await axios.post(`${apiUrl}/workouts`, dataToSend, {
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
                disabled={loading || workoutTypes.length === 0} // Disable if loading types
              >
                <option value="">Select Type</option>
                {workoutTypes.map((type, index) => (
                  <option key={index} value={type.name || type}>
                    {type.name || type}
                  </option>
                ))}
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
                disabled={loading}
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
                disabled={loading}
              />
            </div>
          </div>

          {/* Second row */}
          <div className="form-row">
            <div className="form-column">
              <label className="label">Calories Burned</label>
              <input
                type="number"
                name="calories"
                value={workoutData.calories}
                onChange={handleChange}
                className="input"
                disabled={loading}
              />
            </div>

            <div className="form-column">
              <label className="label">Date</label>
              <input
                type="date"
                name="workoutDate"
                value={workoutData.workoutDate}
                onChange={handleChange}
                className="input"
                disabled={loading}
              />
            </div>
          </div>

          {/* Description */}
          <div className="form-row-description">
            <label className="label">Description:</label>
            <textarea
              name="details"
              value={workoutData.details}
              onChange={handleChange}
              className="input"
              rows="4"
              disabled={loading}
            />
          </div>

          <div className="form-row">
            <div className="form-column">
              <button
                type="button"
                className="cancel-button"
                onClick={() => navigate(-1)}
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
