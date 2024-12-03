import React, { useEffect, useState } from 'react';
import { Activity, Bike, Captions, LogOut, User } from 'lucide-react';

const Dashboard = () => {
  const [activities, setActivities] = useState([]);

  // Fetch workouts from the backend
  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const token = localStorage.getItem('authToken');

        if (!token)
          return;

        const response = await fetch('http://localhost:3001/api/workouts', {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }, // Include token for authentication
        });

        if (!response.ok) {
          throw new Error('Failed to fetch workouts');
        }

        const data = await response.json();

        console.log(data);

        // Transform the data from the backend to match the structure required by the component
        const formattedActivities = data.map((workout) => ({
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
            ...(workout.calories_burned ? [{ label: 'Calories', value: `${workout.calories_burned} Cal` }] : []),
          ],
          icon: getIconByType(workout.workout_type), // Map workout type to an icon
        }));

        setActivities(formattedActivities);
      } catch (error) {
        console.error('Error fetching workouts:', error);
      }
    };

    fetchWorkouts();
  }, []);

  // Function to map workout types to icons
  const getIconByType = (type) => {
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

  return (
    <>
      <div className="header">
        <h1 className="welcome-text">Welcome Back, Felipe J. F.</h1>
        <h2 className="activities-text">Activities in November, 2024</h2>
      </div>

      {/* Activity Cards Grid */}
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
            </div>
          ))
        ) : (
          <p>No activities found. Log your first workout!</p>
        )}
      </div>
    </>
  );
};

export default Dashboard;
