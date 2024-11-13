# Workout-Tracker
Workout Tracker App for CS35L UCLA.

1. Set up the server
Download and install Node.js from https://nodejs.org/en/download/prebuilt-installer/current
Install the required packages:
> npm install
> npm install express --save
> npm install jsonwebtoken

2. Set up test tool 
Download Postman from https://www.postman.com/downloads/

Test Result: 
  2.1 User registration 
  Run the server
  > node app.js  
  Check that the server is running through the web browser.
  > ipconfig
   IPv4 Address. . . . . . . . . . . : 192.168.0.1
  > http://192.168.0.1:3000
  Check the following message. 
  Welcome to the Workout Tracker App!
  
  Send the following POST request in Postman to create a new user
  {
  "username": "testuser",
  "password": "password123",
  "email": "123@ucla.edu"
  }
  Check the response with the following message. 
  201 Created: "User registered successfully." 

