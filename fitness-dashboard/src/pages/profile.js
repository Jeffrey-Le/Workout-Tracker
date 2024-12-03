import React, { useRef, useState } from 'react';
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
          <ActivityTracker className="activity-tracker" />
        </div>
        {/* BMI Plot */}
        <div className="bmi-plot">
          <ActivityTracker className="activity-tracker" />
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
