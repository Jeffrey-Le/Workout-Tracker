import React, { useRef, useState, useEffect } from 'react';
import './profile.css';
import ActivityTracker from './chart.js';
import ImageGallery from 'react-image-gallery';

const Profile = () => {
  const [image, setImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    document.getElementById('fileInput').click();
  };

  const images = [
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
    {
      original: 'https://picsum.photos/id/1018/1000/600/',
      thumbnail: 'https://picsum.photos/id/1018/250/150/',
    },
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
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const mainImageRef = useRef(null);

  // Function to handle thumbnail click
  const handleThumbnailClick = (event, index) => {
    setCurrentIndex(index); // Set the current index to the clicked thumbnail
    setTimeout(enterFullscreen, 100); // Enter fullscreen mode after a short delay
  };

  // Function to enter fullscreen mode
  const enterFullscreen = () => {
    if (mainImageRef.current) {
      if (mainImageRef.current.requestFullscreen) {
        mainImageRef.current.requestFullscreen();
      } else if (mainImageRef.current.mozRequestFullScreen) { // Firefox
        mainImageRef.current.mozRequestFullScreen();
      } else if (mainImageRef.current.webkitRequestFullscreen) { // Chrome, Safari and Opera
        mainImageRef.current.webkitRequestFullscreen();
      } else if (mainImageRef.current.msRequestFullscreen) { // IE/Edge
        mainImageRef.current.msRequestFullscreen();
      }
    }
  };

  // Login Test (FOR TESTING PURPOSES ONLY)
  const [token, setToken] = useState(0);

  useEffect(() => {
    const login = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "username": "testUser",
            "password": "testing123"
          })
        });
  
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }
  
        const data = await response.json();
        if (data) {
          setToken(data.token);
        }
      } catch (error) {
        console.error('Error fetching User Login data:', error);
      }
    };
  
    login();
  }, []);

  // Fetch Activity Data
  const [activityData, setActivityData] = useState(() => {
    const cachedData = localStorage.getItem('activityData');
    return cachedData ? JSON.parse(cachedData) : null;
  });
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth()+1);

  const changeMonth = (newMonth) => {
    const monthNumber = monthNames.findIndex(month => month.toLowerCase().startsWith(newMonth.toLowerCase()));
    setSelectedMonth(monthNumber+1);
  };

  useEffect(() => {
    const cachedData = localStorage.getItem('activityData');
    setActivityData(cachedData ? JSON.parse(cachedData)['activity_data'][selectedMonth] : []);
  }, [selectedMonth]);

  const formatActivityData = () => {
    if (activityData.map) {
      const distanceSums = activityData.map(subArray =>
        subArray.reduce((sum, item) => parseFloat(sum) + parseFloat((item.distance || 0)), 0)
      );

      return distanceSums;
    }
  }

 

  // Fetch BMI Data
  const [bmiData, setBmiData] = useState(() => {
    const cachedData = localStorage.getItem('bmiData');
    return cachedData ? JSON.parse(cachedData) : null;
  });
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());

  // Array of month names
  const monthNames = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];

  const changeYear = (newYear) => {
    setSelectedYear(newYear);
  };
  
  useEffect(() => {
    const cachedData = localStorage.getItem('bmiData');
    setBmiData(cachedData ? JSON.parse(cachedData) : null);
  }, [selectedYear]);

  useEffect(() => {
    const fetchLogData = async () => {
      try {
        const curYear = new Date().getFullYear().toString();
        const response = await fetch(`http://localhost:3001/api/workouts/activity?user_id=27&year=${curYear}`, {
          method: 'GET', // HTTP method
          headers: {
            'Authorization': `Bearer ${token}`, // Attach token in Authorization header
            'Content-Type': 'application/json', // Optional, depending on your API
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        const data = await response.json() || [];
        if (data) {
          setActivityData(data['activity_data'][selectedMonth] || []);
          localStorage.setItem('activityData', JSON.stringify(data)); // Cache to localStorage
        }
      } catch (error) {
        console.error('Error fetching Logging data:', error);
      }
    }


    const fetchBmiData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/bmi/graph', {
          method: 'GET', // HTTP method
          headers: {
            'Authorization': `Bearer ${token}`, // Attach token in Authorization header
            'Content-Type': 'application/json', // Optional, depending on your API
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        const data = await response.json();
        if (data) {
          setBmiData(data);
          localStorage.setItem('bmiData', JSON.stringify(data)); // Cache to localStorage
        }
      } catch (error) {
        console.error('Error fetching BMI data:', error);
      }
    };

    fetchLogData();
    fetchBmiData();
  }, [token]); // Empty dependency array ensures it runs only once, like `DOMContentLoaded`.

  if (!activityData) {
    return <div>Loading Activity Logging data...</div>;
  }

  if (!bmiData) {
    return <div>Loading BMI data...</div>;
  }

  return (
    <>
      {/* Profile picture row */}
      <div className="profile-header">

        <div className="profile-column">
          {/* sub-column: profile picture */}
          <div className="col-1" onClick={triggerFileInput} style={{ cursor: 'pointer' }}>
            <img src={image || "https://via.placeholder.com/150"} alt="Profile" className="profile-picture"/>
            <input 
              type='file' 
              id='fileInput' 
              accept='image/*' 
              onChange={handleImageUpload} 
              style={{ display: 'none' }} 
            />
          </div>
          {/* sub-column: profile text */}
          <div className="profile-text">
            <h1>Felipe J. F.</h1>
            <p>Los Angeles, CA</p>
          </div>
        </div>

        {/* 2nd column: activity/time/distance 3 sub column Display */}
        <div className="col-2 activity-time-distance">
          <div className="activity">
            <h1>Activities</h1>
            <p>12</p>
          </div>
          <div className="time">
            <h1>Time</h1>
            <p>12h 30m</p>
          </div>
          <div className="distance">
            <h1>Distance</h1>
            <p>50 km</p>
          </div>
        </div>
      </div>

      {/* Activity + BMI plots row */}
      <div className="profile-activity-cards">
        {/* Activity Plot */}
        <div className="activity-plot">
          <ActivityTracker className="activity-tracker" title={'Activity Tracking: Distance'} selectedDate={monthNames[selectedMonth-1].slice(0, 3)} changeYear={changeMonth} labels={{xLabel: activityData.map !== undefined ? activityData.map((_, index) => index) : [], activityLabel: "Distance Covered" }} xKey={[]} clickIndexLabel={monthNames.map(item => item.slice(0, 3))} data={formatActivityData()}/>
        </div>
        {/* BMI Plot */}
        <div className="bmi-plot">
          <ActivityTracker className="activity-tracker" selectedDate={selectedYear} changeYear={changeYear} title={'BMI'} labels={{xLabel: monthNames.map(item => item.slice(0, 3)), activityLabel: 'Average BMI'}} xKey={[]} clickIndexLabel={Object.keys(bmiData)} data={bmiData[selectedYear]} />
        </div>
      </div>

      {/* Image Gallery Row */}
      <div className="image-gallery-row">
        {/* Image Gallery */}
        <ImageGallery 
          items={images}
          showPlayButton={false}   
          showFullscreenButton={false} 
          showNav={false}           // Hide navigation arrows
          renderItem={() => null}   // Hide the main image by rendering nothing
          onThumbnailClick={handleThumbnailClick} // Handle thumbnail click
        />
      </div>  

      {/* Conditionally render the main image */}
      <div ref={mainImageRef} style={{ visibility: 'hidden' }}>
        <img
          src={images[currentIndex].original}
          alt={`Image ${currentIndex + 1}`}
          style={{ width: "100%", height: "auto" }}
        />
      </div>
    </>
  );
};

export default Profile;
