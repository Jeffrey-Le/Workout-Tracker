import React, { useEffect, useState } from 'react'; 
import { Activity, Bike, LogOut, User, Trash2 } from 'lucide-react';
import axios from 'axios';	
const apiUrl = 'http://localhost:5001/api'; // Updated apiUrl

const Dashboard = () => {
  const [activities, setActivities] = useState([]);

  // Fetch workouts from the backend
  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        // Retrieve the token from localStorage
        const token = localStorage.getItem('token');
        const response = await axios.get(`${apiUrl}/workouts`, {
          headers: { Authorization: `Bearer ${token}` }, // Added 'Bearer ' prefix
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

  // Handler to delete a workout
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${apiUrl}/workouts/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` }, // Added 'Bearer ' prefix
      });
      // Update the state to remove the deleted workout
      setActivities(activities.filter(activity => activity.id !== id));
    } catch (error) {
      console.error('Error deleting workout:', error);
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
