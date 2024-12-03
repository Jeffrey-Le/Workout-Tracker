import React, { useRef, useState, useEffect } from 'react';
import './profile.css';
import ActivityTracker from './chart';
import ImageGallery from 'react-image-gallery';

const Profile = () => {
  const baseUrl = `http://localhost:5000/api`;

  const [image, setImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        localStorage.setItem('profileIcon', reader.result);
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
  const [user, setUser] = useState(null);
  
  // Fetch Data
  const [loading, setLoading] = useState(true);
  const [activityData, setActivityData] = useState(null);  // Activity Data
  const [bmiData, setBmiData] = useState(null);  // BMI Data

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // Defaults to today's month
  const [selectedBmiYear, setSelectedBmiYear] = useState(new Date().getFullYear().toString()); // Defaults to today's Year

  const [totalActivity, setTotalActivity] = useState({});

  // For Adding BMI Manually
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');

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
  const totalActivityData = () => {
    let cachedActivityData = localStorage.getItem('activityData');

    if (cachedActivityData)
      cachedActivityData = JSON.parse(cachedActivityData)['activity_data'];
    
    const total = {"count": 0, "duration": 0, "distance": 0};

    if (cachedActivityData) {
      for (let month in cachedActivityData) {
        const filteredMonth = cachedActivityData[month].filter(day => day.length > 0); // Gets rid of all days in a month that are empty

        filteredMonth.forEach((day) => {
          day.forEach((log) => {
            total.count++;
            total.duration += log.duration;
            total.distance += parseFloat(log.distance);
          })
        })
      }
    }

    setTotalActivity(total);
  }

  // Calculates the distance covered each day for every activity log that exists
  const formatActivityData = () => {
    if (activityData?.map) {
      const distanceSums = activityData.map(subArray =>
        subArray.reduce((sum, item) => parseFloat(sum) + parseFloat((item.distance || 0)), 0)
      );

      return distanceSums;
    }
  }

  const fetchActivityData = async () => {
    try {
      const curYear = new Date().getFullYear().toString();

      const activityResponse = await fetch(`${baseUrl}/workouts/activity?user_id=${user["user_id"]}&year=${curYear}`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      });

      if (!activityResponse.ok) throw new Error(`Failed to fetch activity data: ${activityResponse.statusText}`);

      const activityData = await activityResponse.json();

      setActivityData(activityData['activity_data'][selectedMonth]);
      localStorage.setItem("activityData", JSON.stringify(activityData));
    } catch (err) {
      console.log('Error fetching Activity Logs: ', err);
    }
  }

  const fetchBmiData = async () => {
    try {
      const bmiResponse = await fetch(`${baseUrl}/bmi/graph`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      });

      if (!bmiResponse.ok) throw new Error(`Failed to fetch BMI data: ${bmiResponse.statusText}`);

      const bmiData = await bmiResponse.json();

      setBmiData(bmiData);
      localStorage.setItem("bmiData", JSON.stringify(bmiData));
    } catch (err) {
      console.log("Error fetching BMI Data: ", err);
    }
  }

  useEffect(() => {
    const cachedToken = localStorage.getItem('authToken');
    if (cachedToken)
      setToken(cachedToken);

    const cachedUser = localStorage.getItem('user');
    if (cachedUser)
      setUser(JSON.parse(cachedUser));

  }, []); // Runs only once when the component mounts

  useEffect(() => {
    const preLoadData = async () => {
      try {
        const cachedImage = localStorage.getItem('profileIcon');

        if (cachedImage) {
          if (cachedImage.startsWith("data:image/")) {
            setImage(cachedImage);
          }
        }

        // Check if data is cached in localStorage
        const cachedActivityData = localStorage.getItem("activityData");
        const cachedBmiData = localStorage.getItem("bmiData");

        if (cachedActivityData)
          setActivityData(JSON.parse(cachedActivityData)['activity_data'][selectedMonth]);

        if (cachedBmiData)
          setBmiData(JSON.parse(cachedBmiData));

        // If not found in localStorage, fetch from API
        if (!cachedActivityData)
         fetchActivityData(); // Fetch activity data if not cached

        if (!cachedBmiData)
         fetchBmiData(); // Fetch BMI data if not cached

      } catch (error) {
        console.error('Error preloading data:', error);
      } finally {
        setLoading(false); // Set loading to false if data is fetched and loaded
      }
    };

    preLoadData();
  }, [token, selectedMonth, selectedBmiYear]);

  useEffect(() => {
    totalActivityData();
  }, [activityData]);

  const handleBmiSubmit = async (event) => {
    event.preventDefault(); // Prevent page reload
    if (!weight || !height) {
      alert("Please enter both weight and height.");
      return;
    }

    // console.log("Weight:", weight);
    // console.log("Height:", height);

    let finalHeight = height;

    if (user['height'] != null) // If the user provided a height in registration, then we will use that instead
      finalHeight = user['height'];

    try {
      // API request to log workout
      const response = await fetch(`${baseUrl}/bmi/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            weight: weight,
            height: finalHeight
        }),
    });
    
    if (!response.ok) {
        throw new Error('Failed to log workout');
    }

    const data = await response.json();
    console.log('Workout logged successfully:', data);

    fetchBmiData();

    setWeight('');
    setHeight('');

    } catch (err) {
      console.log("Error: ", err);
    }
  };

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
            <h1>{user.username}</h1>
            <p>Los Angeles, CA</p>
          </div>
        </div>

        {/* 2nd column: activity/time/distance 3 sub column Display */}
        <div className="col-2 activity-time-distance">

        <form onSubmit={handleBmiSubmit} className='bmiForm'>
          <div>
            <label htmlFor="weight">Weight (kg): </label>
            <input
              type="number"
              id="weight"
              value={weight}
              onChange={(e) => setWeight(parseInt(e.target.value))}
              placeholder="Enter your weight"
              required

              className='text-center text-sm text-gray-400 bg-[#5050a0] text-white rounded-full'
            />
          </div>
          <div>
            <label htmlFor="height">Height (cm): </label>
            <input
              type="number"
              id="height"
              value={height}
              onChange={(e) => setHeight(parseInt(e.target.value))}
              placeholder="Enter your height"
              required

              className='text-center text-sm text-gray-400 bg-[#5050a0] text-white rounded-full'
            />
          </div>
          <button type="submit">Add BMI</button>
    </form>

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
          <ActivityTracker className="activity-tracker"
          title={'Activity Tracking: Distance'}
          selectedDate={monthNames[selectedMonth-1].slice(0, 3)}
          changeTemporal={changeMonth}
          labels={{xLabel: activityData ? activityData.map((_, index) => index) : [], activityLabel: "Distance Covered" }}
          xKey={[]} clickIndexLabel={monthNames.map(item => item.slice(0, 3))}
          data={formatActivityData()}/>
        </div>
        {/* BMI Plot */}
        <div className="bmi-plot">
          <ActivityTracker className="activity-tracker"
          title={'BMI'}
          selectedDate={selectedBmiYear}
          changeTemporal={changeYear}
          labels={{xLabel: monthNames.map(item => item.slice(0, 3)), activityLabel: 'Average BMI'}}
          xKey={[]} clickIndexLabel={bmiData ? Object.keys(bmiData) : []}
          data={bmiData && selectedBmiYear ? bmiData[selectedBmiYear] : []} />
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
