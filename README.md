# Workout-Tracker
Workout Tracker App for CS35L UCLA.

## 1. Set up the server

Download and install Node.js from [Node.js Download Page](https://nodejs.org/en/download/prebuilt-installer/current)

Install the required packages:
```
npm install
npm install express --save
npm install jsonwebtoken
npm install cors
```

## 2. Set up the database

Install PostgreSQL: Download and install PostgreSQL from PostgreSQL Download Page.

Create the database: Run the following commands in the psql terminal.
```
CREATE DATABASE workoutdb OWNER "35LbsAdmin";
```
Run the SQL schema: Execute the provided workoutDB-Setup.sql file to create tables and indexes.
```
psql -U 35LbsAdmin -d workoutdb -f workoutDB-Setup.sql
```
Verify tables: After running the schema, connect to the database and list tables.
```
psql -U 35LbsAdmin -d workoutdb
\dt
```

## 3. Set up test tool

Download Postman from [Postman Download Page](https://www.postman.com/downloads/)

## 4. Test Result

### 4.1 User Registration

1. **Run the server**:
   ```
   node app.js
   ```
   
2. **Check that the server is running** through the web browser:
   ```
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

## 5. Set up the React Frontend

Clone the repository for the React frontend app.
Install React Dependencies:
 ```
npm install react-router-dom
npm install lucide-react
npm install react-chartjs-2 chart.js
npm install react-image-gallery
   ```
Open the .env file (or create one) in the root directory and add:
 ```
REACT_APP_API_URL=http://localhost:3000
   ```

Run the React App: npm start
The app should be available at http://localhost:3001 by default.
Verify Connection with Backend:
- Ensure the backend server is running:

Check functionality in the browser (e.g., registering a user, logging workouts).
