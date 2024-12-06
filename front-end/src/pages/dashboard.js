import React, { useEffect, useState } from 'react';
import { Activity, Bike, User, Trash } from 'lucide-react';
import axios from 'axios';
import './dashboard.css';

const apiUrl = 'http://localhost:5001';

const Dashboard = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [activities, setActivities] = useState([]);
  const [userName, setUserName] = useState('User');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const currentDate = new Date();
  const currentMonthYear = currentDate.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  useEffect(() => {
    const fetchData = async () => {
      // Start loading
      setLoading(true);
      setError(null);

      if (!token) {
        console.error('No token found. Please log in.');
        setLoading(false);
        return;
      }

      try {
        // Fetch user data
        const userResponse = await axios.get(`${apiUrl}/profile`, {
          headers: { Authorization: token },
        });
        const userData = userResponse.data;
        setUserName(userData.username || 'User');

        // Fetch workouts (no filters, just the full list like before)
        const workoutsResponse = await axios.get(`${apiUrl}/workouts`, {
          headers: { Authorization: token },
        });
        const data = workoutsResponse.data;

        // Transform data into the activity cards format
        const formattedActivities = data.map((workout) => ({
          workoutId: workout.workout_id,
          date: new Date(workout.workout_date).toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          }),
          type: workout.workout_type,
          metrics: [
            ...(workout.distance ? [{ label: 'Distance', value: `${workout.distance} mi` }] : []),
            ...(workout.duration ? [{ label: 'Time', value: `${workout.duration} min` }] : []),
            ...(workout.calories ? [{ label: 'Calories', value: `${workout.calories} Cal` }] : []),
          ],
          icon: getIconByType(workout.workout_type),
        }));

        setActivities(formattedActivities);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data. Please try again.');
      } finally {
        // Stop loading
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const deleteWorkout = async (workoutId) => {
    if (!token) {
      console.error('No token found. Please log in.');
      return;
    }
    try {
      await axios.delete(`${apiUrl}/workouts/${workoutId}`, {
        headers: { Authorization: token },
      });

      setActivities((prevActivities) =>
        prevActivities.filter((activity) => activity.workoutId !== workoutId)
      );

      alert('Workout deleted successfully');
    } catch (error) {
      console.error('Error deleting workout:', error);
      alert('Failed to delete workout. Please try again.');
    }
  };

  const getIconByType = (type) => {
    switch (type.toLowerCase()) {
      case 'run':
        return Activity;
      case 'cycling':
        return Bike;
      case 'yoga':
        return User;
      default:
        return User;
    }
  };

  return (
    <>
      <div className="header">
        <h1 className="welcome-text">Welcome Back, {userName}.</h1>
        <h2 className="activities-text">Activities in {currentMonthYear}</h2>
      </div>

      {error && (
        <div style={{ color: 'red', margin: '1rem 0' }}>
          {error}
        </div>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="activity-cards">
          {activities.length > 0 ? (
            activities.map((activity, index) => (
              <div key={index} className="activity-card">
                <div className="activity-header">
                  <div>
                    <p className="activity-date">{activity.date}</p>
                    <h3 className="activity-type">{activity.type}</h3>
                  </div>
                  <activity.icon className="icon" />
                </div>

                <div className="activity-metrics">
                  {activity.metrics.map((metric, idx) => (
                    <div key={idx} className="metric">
                      <p className="metric-label">{metric.label}</p>
                      <p className="metric-value">{metric.value}</p>
                    </div>
                  ))}
                </div>

                <button
                  className="delete-button"
                  onClick={() => deleteWorkout(activity.workoutId)}
                >
                  <Trash className="icon-trash" />
                </button>
              </div>
            ))
          ) : (
            <p>No workouts found.</p>
          )}
        </div>
      )}
    </>
  );
};

export default Dashboard;
