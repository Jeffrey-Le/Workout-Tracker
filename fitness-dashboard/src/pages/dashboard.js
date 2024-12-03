import React, { useEffect, useState } from 'react';
import { Activity, Bike, LogOut, User, Trash2 } from 'lucide-react';
import axios from 'axios';
const apiUrl = 'http://localhost:5001/api'; // Updated apiUrl

const Dashboard = () => {
  const [activities, setActivities] = useState([]);
  const [userName, setUserName] = useState('User');

  const currentDate = new Date();
  const currentMonthYear = currentDate.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  // Fetch user data and workouts from the backend
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${apiUrl}/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userData = response.data;
        setUserName(userData.username || 'User');
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchWorkouts = async () => {
      try {
        // Retrieve the token from localStorage
        const token = localStorage.getItem('token');
        const response = await axios.get(`${apiUrl}/workouts`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = response.data;

        // Transform the data from the backend to match the structure required by the component
        const formattedActivities = data.map((workout) => ({
          id: workout.workout_id, // Include the workout ID
          date: new Date(workout.workout_date).toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          }),
          type: workout.workout_type,
          metrics: [
            ...(workout.distance
              ? [{ label: 'Distance', value: `${workout.distance} mi` }]
              : []),
            ...(workout.duration
              ? [{ label: 'Time', value: `${workout.duration} min` }]
              : []),
            ...(workout.calories_burned
              ? [{ label: 'Calories', value: `${workout.calories_burned} Cal` }]
              : []),
          ],
          icon: getIconByType(workout.workout_type), // Map workout type to an icon
        }));

        setActivities(formattedActivities);
      } catch (error) {
        console.error('Error fetching workouts:', error);
      }
    };

    fetchUserData();
    fetchWorkouts();
  }, []);

  // Function to map workout types to icons
  const getIconByType = (type) => {
    if (!type) return User; // Default icon if type is undefined
    switch (type.toLowerCase()) {
      case 'run':
        return Activity;
      case 'cycling':
        return Bike;
      case 'yoga':
        return User;
      default:
        return User; // Default icon
    }
  };

  // Handler to delete a workout
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${apiUrl}/workouts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Update the state to remove the deleted workout
      setActivities(activities.filter((activity) => activity.id !== id));
    } catch (error) {
      console.error('Error deleting workout:', error);
    }
  };

  return (
    <>
      <div className="header">
        <h1 className="welcome-text">Welcome Back, {userName}.</h1>
        <h2 className="activities-text">Activities in {currentMonthYear}</h2>
      </div>

      {/* Activity Cards Grid */}
      <div className="activity-cards">
        {activities.length > 0 ? (
          activities.map((activity, index) => {
            const IconComponent = activity.icon; // Extract the icon component
            return (
              <div key={index} className="activity-card">
                <div className="activity-header">
                  <div>
                    <p className="activity-date">{activity.date}</p>
                    <h3 className="activity-type">{activity.type}</h3>
                  </div>
                  <div className="icons">
                    <IconComponent className="icon" />
                    <Trash2
                      className="delete-icon"
                      onClick={() => handleDelete(activity.id)}
                    />
                  </div>
                </div>

                <div className="activity-metrics">
                  {activity.metrics.map((metric, idx) => (
                    <div key={idx} className="metric">
                      <p className="metric-label">{metric.label}</p>
                      <p className="metric-value">{metric.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        ) : (
          <p>No activities found. Log your first workout!</p>
        )}
      </div>
    </>
  );
};

export default Dashboard;
