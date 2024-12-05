import React, { useRef, useState, useEffect } from 'react';
import './profile.css';
import ImageGallery from 'react-image-gallery';

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("authToken"));
  const [profileData, setProfileData] = useState(null);
  const [activityData, setActivityData] = useState(null);
  const [bmiHistory, setBmiHistory] = useState(null);
  const [images] = useState([
    {
      original: 'https://picsum.photos/id/1018/1000/600/',
      thumbnail: 'https://picsum.photos/id/1018/250/150/',
    },
    {
      original: 'https://picsum.photos/id/1015/1000/600/',
      thumbnail: 'https://picsum.photos/id/1015/250/150/',
    },
    {
      original: 'https://picsum.photos/id/1019/1000/600/',
      thumbnail: 'https://picsum.photos/id/1019/250/150/',
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileResponse = await fetch('http://localhost:5001/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (profileResponse.ok) {
          const profile = await profileResponse.json();
          setProfileData(profile);
        }

        const activityResponse = await fetch('http://localhost:5001/workouts', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (activityResponse.ok) {
          const activities = await activityResponse.json();
          setActivityData(activities);
        }

        const bmiResponse = await fetch('http://localhost:5001/bmi', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (bmiResponse.ok) {
          const bmi = await bmiResponse.json();
          setBmiHistory(bmi);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      {profileData && (
        <div className="profile-details">
          <h2>User Information</h2>
          <p><strong>Username:</strong> {profileData.username}</p>
          <p><strong>Email:</strong> {profileData.email}</p>
          <p><strong>Age:</strong> {profileData.age}</p>
          <p><strong>Gender:</strong> {profileData.gender}</p>
          <p><strong>Height:</strong> {profileData.height} cm</p>
        </div>
      )}
      {activityData && (
        <div className="activity-data">
          <h2>Activity Data</h2>
          <ul>
            {activityData.map((activity, index) => (
              <li key={index}>
                {activity.workout_type} - {activity.duration} mins, {activity.distance} km
              </li>
            ))}
          </ul>
        </div>
      )}
      {bmiHistory && (
        <div className="bmi-history">
          <h2>BMI History</h2>
          <ul>
            {bmiHistory.map((record, index) => (
              <li key={index}>
                Weight: {record.weight} kg, Height: {record.height} cm
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="image-gallery">
        <h2>Workout Gallery</h2>
        <ImageGallery items={images} />
      </div>
    </div>
  );
};

export default Profile;
