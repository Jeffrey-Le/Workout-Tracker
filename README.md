# Workout-Tracker
Workout Tracker App for CS35L UCLA.

## 1. Set up the server

Download and install Node.js from [Node.js Download Page](https://nodejs.org/en/download/prebuilt-installer/current)

Install the required packages:
```sh
npm install
npm install express --save
npm install jsonwebtoken
npm install cors
```

## 2. Set up test tool

Download Postman from [Postman Download Page](https://www.postman.com/downloads/)

## 3. Test Result

### 3.1 User Registration

1. **Run the server**:
   ```sh
   node app.js
   ```
   
2. **Check that the server is running** through the web browser:
   ```sh
   ipconfig
   ```
   - Find your IPv4 address, e.g., `192.168.0.1`
   - Go to: `http://192.168.0.1:3000`
   - You should see the following message: "Welcome to the Workout Tracker App!"

3. **Send a POST request in Postman** to create a new user:
   - URL: `http://192.168.0.1:3000/register`
   - Method: `POST`
   - Body (JSON):
     ```json
     {
       "username": "testuser",
       "password": "password123",
       "email": "123@ucla.edu"
     }
     ```

4. **Check the response**:
   - You should receive the following message:
     ```
     201 Created: "User registered successfully."
     ```
