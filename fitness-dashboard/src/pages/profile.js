import React, { useRef, useState, useEffect } from 'react';
import './profile.css';
import ActivityTracker from './chart';
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

  const [token, setToken] = useState(null);
  
  // Fetch Data
  const [loading, setLoading] = useState(true);
  const [activityData, setActivityData] = useState(null);  // Fetch Activity Data
  const [bmiData, setBmiData] = useState(null);  // Fetch BMI Data

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedBmiYear, setSelectedBmiYear] = useState(new Date().getFullYear().toString());

  const [totalActivity, setTotalActivity] = useState({});

  // Array of month names 
  const monthNames = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];

  const changeMonth = (newMonth) => {
    const monthNumber = monthNames.findIndex(month => month.toLowerCase().startsWith(newMonth.toLowerCase()));
    setSelectedMonth(monthNumber+1);
  };

  const changeYear = (newYear) => {
    setSelectedBmiYear(newYear);
  };

  // Calculate the summed activity data for the user
  const totalActivityData = (data) => {
    const total = {"count": 0, "duration": 0, "distance": 0};

    if (data?.forEach) {
    data.forEach((day) => {
      day.forEach((log) => {
        total.count++;
        total.duration += log.duration;
        total.distance += parseFloat(log.distance);
      });
    });
  }

  setTotalActivity(total);
  }

  const formatActivityData = () => {
    if (activityData.map) {
      const distanceSums = activityData.map(subArray =>
        subArray.reduce((sum, item) => parseFloat(sum) + parseFloat((item.distance || 0)), 0)
      );

      return distanceSums;
    }
  }

  useEffect(() => {
    const preLoadData = async () => {
      try {
        // Check if data is cached in localStorage
        const cachedActivityData = localStorage.getItem("activityData");
        const cachedBmiData = localStorage.getItem("bmiData");

        if (cachedActivityData)
          setActivityData(JSON.parse(cachedActivityData)['activity_data'][selectedMonth]);

        if (cachedBmiData)
          setBmiData(JSON.parse(cachedBmiData));

        // Login for TESTING
        const response = await fetch('http://localhost:3001/api/users/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: 'testUser',
            password: 'testing123',
          }),
        });

        if (!response.ok) throw new Error(`Login failed: ${response.statusText}`);
        
        const data = await response.json();
        setToken(data.token); // Set token from login
        
        // If not found in localStorage, fetch from API
        if (!cachedActivityData) {
          // Fetch activity data if not cached
          const curYear = new Date().getFullYear().toString();

          const activityResponse = await fetch(`http://localhost:3001/api/workouts/activity?user_id=27&year=${curYear}`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${data.token}`, 'Content-Type': 'application/json' },
          });

          if (!activityResponse.ok) throw new Error(`Failed to fetch activity data: ${activityResponse.statusText}`);

          const activityData = await activityResponse.json();

          setActivityData(activityData['activity_data'][selectedMonth]);
          localStorage.setItem("activityData", JSON.stringify(activityData));
        }

        if (!cachedBmiData) {
          // Fetch BMI data if not cached
          const bmiResponse = await fetch('http://localhost:3001/api/bmi/graph', {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${data.token}`, 'Content-Type': 'application/json' },
          });

          if (!bmiResponse.ok) throw new Error(`Failed to fetch BMI data: ${bmiResponse.statusText}`);

          const bmiData = await bmiResponse.json();

          setBmiData(bmiData);
          localStorage.setItem("bmiData", JSON.stringify(bmiData));
        }
      } catch (error) {
        console.error('Error preloading data:', error);
      } finally {
        setLoading(false); // Set loading to false if data is fetched and loaded
      }
    };

    preLoadData();
  }, [selectedMonth, selectedBmiYear]);

  useEffect(() => {
    totalActivityData(activityData);
  }, [activityData]);

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a spinner or a skeleton loader
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
            <p>{totalActivity.count}</p>
          </div>
          <div className="time">
            <h1>Time</h1>
            <p>{Math.floor(totalActivity.duration / 60)}h {totalActivity.duration % 60}m</p>
          </div>
          <div className="distance">
            <h1>Distance</h1>
            <p>{totalActivity.distance} km</p>
          </div>
        </div>
      </div>

      {/* Activity + BMI plots row */}
      <div className="profile-activity-cards">
        {/* Activity Plot */}
        <div className="activity-plot">
          <ActivityTracker className="activity-tracker" title={'Activity Tracking: Distance'} selectedDate={monthNames[selectedMonth-1].slice(0, 3)} changeTemporal={changeMonth} labels={{xLabel: activityData.map !== undefined ? activityData.map((_, index) => index) : [], activityLabel: "Distance Covered" }} xKey={[]} clickIndexLabel={monthNames.map(item => item.slice(0, 3))} data={formatActivityData()}/>
        </div>
        {/* BMI Plot */}
        <div className="bmi-plot">
          <ActivityTracker className="activity-tracker" selectedDate={selectedBmiYear} changeTemporal={changeYear} title={'BMI'} labels={{xLabel: monthNames.map(item => item.slice(0, 3)), activityLabel: 'Average BMI'}} xKey={[]} clickIndexLabel={Object.keys(bmiData)} data={bmiData[selectedBmiYear]} />
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
