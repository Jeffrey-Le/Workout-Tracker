import React, { useRef, useState, useEffect } from 'react';
import './profile.css';
import ActivityTracker from './chart';
import ImageGallery from 'react-image-gallery';
import axios from 'axios';

const Profile = () => {
  const apiUrl = `http://localhost:5001`;

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
      original: 'https://picsum.photos/id/1019/1000/600/',
      thumbnail: 'https://picsum.photos/id/1019/250/150/',
    },
    {
      original: 'https://picsum.photos/id/1019/1000/600/',
      thumbnail: 'https://picsum.photos/id/1019/250/150/',
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

  // Token and User
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  
  // Fetch Data
  const [loading, setLoading] = useState(true);
  const [bmiData, setBmiData] = useState(null);  // BMI Data

  const [selectedBmiYear, setSelectedBmiYear] = useState(new Date().getFullYear().toString()); // Defaults to today's Year

  // For Adding BMI Manually
  const [weight, setWeight] = useState('');
  const [month, setMonth] = useState('');

  // Total Data for Display
  const [totalActivity, setTotalActivity] = useState(null);

  // Array of month names 
  const monthNames = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];

  const changeYear = (newYear) => {
    setSelectedBmiYear(newYear);
  };

  const fetchBmiData = async () => {
    try {
      const bmiResponse = await axios.get(`${apiUrl}/bmi/graph`, {
        headers: { Authorization: token },
      });

      const bmiData = bmiResponse.data;

      setBmiData(bmiData);
      localStorage.setItem("bmiData", JSON.stringify(bmiData));
    } catch (err) {
      console.log("Error fetching BMI Data: ", err);
    }
  }

  const totalActivityData = async () => {
      try {
      const res = await axios.get(`${apiUrl}/workouts`, {
        headers: { Authorization: token },
      });

      const workouts = res.data;

      console.log(workouts);
      
      const total = {"count": 0, "duration": 0, "distance": 0};

      if (workouts) {
        workouts.forEach((log) => {
          total.count++;
          total.duration += log.duration;
          total.distance += parseFloat(log.distance);
        });
      }

      setTotalActivity(total);
    } catch (err) {
      console.log("Error fetching BMI Data: ", err);
    }
  }

  useEffect(() => {
    const cachedToken = localStorage.getItem('token');
    if (cachedToken)
      setToken(cachedToken);

    const fetchUser = async () => {
      try {
        const res = await axios.get(`${apiUrl}/profile`, {
          headers: { Authorization: cachedToken },
        });
  
        const user = res.data;
  
        setUser(user);
        console.log(user);
      } catch (err) {
        console.log("Error fetching User Data: ", err);
      }
    };

    fetchUser();
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
        const cachedBmiData = localStorage.getItem("bmiData");

        if (cachedBmiData)
          setBmiData(JSON.parse(cachedBmiData));

        if (!cachedBmiData)
         fetchBmiData(); // Fetch BMI data if not cached

        totalActivityData();

      } catch (error) {
        console.error('Error preloading data:', error);
      } finally {
        setLoading(false); // Set loading to false if data is fetched and loaded
      }
    };

    preLoadData();
  }, [token, selectedBmiYear]);

  const handleBmiSubmit = async (event) => {
    event.preventDefault(); // Prevent page reload
    if (!weight || !month) {
      alert("Please enter both weight and month.");
      return;
    }

    try {
      const bmiData = {
        weight: weight,
        height: user.height,
        month: month
      }
      console.log("Token:", token);
      // API request to log workout
      await axios.post(`${apiUrl}/bmi`, bmiData, {
				headers: { Authorization: token },
			});

		// Notify success
		alert('BMI logged successfully!');

    fetchBmiData();

    setWeight('');
    setMonth('');

    console.log("BMI Data:", bmiData);

    } catch (err) {
      console.log("Error: ", err);
      if (err.response) {
        console.log("Response data:", err.response.data);
        console.log("Response status:", err.response.status);
        console.log("Response headers:", err.response.headers);
      }
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
            <h1>{user ? user.username : <div>Loading</div>}</h1>
            <p>Los Angeles, CA</p>
          </div>
        </div>

        {/* 2nd column: activity/time/distance 3 sub column Display */}
        <div className="col-2 activity-time-distance">
          <div className="activity">
            <h1>Activities</h1>
            <p>{totalActivity ? totalActivity.count : 0}</p>
          </div>
          <div className="time">
            <h1>Time</h1>
            <p>{totalActivity ? totalActivity.duration : 0}m</p>
          </div>
          <div className="distance">
            <h1>Distance</h1>
            <p>{totalActivity ? totalActivity.distance : 0}km</p>
          </div>
        </div>
      </div>

      {/* Add new weight by month row */}
      <div className="add-bmi-row">
        <form onSubmit={handleBmiSubmit} className='bmiForm'>
          <div>
            <label htmlFor="weight">Enter Weight(kg):   </label>
            <input
              type="number"
              id="weight"
              value={weight}
              onChange={(e) => setWeight(parseInt(e.target.value))}
              placeholder="Enter your weight"
              required
              className='input-weight'
            />
          </div>
          
          <div>
            <label htmlFor="month">Select Month:   </label>
            <select
              id="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              required
              className='input-month'
            >
              <option value="" disabled>
                Choose a month
              </option>
              <option value="1">January</option>
              <option value="2">February</option>
              <option value="3">March</option>
              <option value="4">April</option>
              <option value="5">May</option>
              <option value="6">June</option>
              <option value="7">July</option>
              <option value="8">August</option>
              <option value="9">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>
          </div>

          <button type="submit" className='add-bmi-button'>
            Add BMI
          </button>
        </form>
      </div>

      {/* BMI plots row */}
      <div className="profile-activity-cards">
        {/* BMI GRAPH */}
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
      <div className="image-gallery-header">
        <h1 className="image-gallery-header-text">Image Gallery</h1>
      </div>

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