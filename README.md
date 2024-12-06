

---

# Workout Tracker App

## Overview

The Workout Tracker App is a full-stack web application designed for logging and managing fitness activities. It provides features for tracking workouts, analyzing BMI trends, and managing user profiles, ensuring a seamless and dynamic user experience.

---

## Features

### Core Features
1. **Dynamic Data Display**
   - Displays workout logs, activity statistics, and BMI trends in real-time.

2. **Data Upload and Persistence**
   - Log workouts with details such as type, duration, distance, and notes.
   - Delete workouts.

3. **Search Functionality**
   - Search workouts by type and date.
   - Fetch results dynamically from the backend.

4. **Secure Authentication**
   - Implements JWT for user authentication.
   - Hashes passwords using `bcrypt`.

5. **User Profile Management**
   - Edit and manage personal details such as username, email, and height.

6. **BMI Tracking**
   - Log and visualize BMI trends with monthly breakdowns.
   - Analyze BMI changes over time using interactive charts.

---

## Technology Stack

### Frontend
- **Frameworks and Libraries:** React.js, Chart.js, Axios, Lucide React, React Router, React Image Gallery
- **Styling:** Tailwind CSS and custom CSS

### Backend
- **Framework:** Node.js with Express.js
- **Database:** PostgreSQL
- **Authentication:** JSON Web Tokens (JWT)
- **Security:** Password hashing using `bcrypt`

---

## Installation and Setup

### Prerequisites
1. **Node.js:** Download and install from [Node.js official website](https://nodejs.org/).
2. **PostgreSQL:** Download and install from [PostgreSQL official website](https://www.postgresql.org/download/).

---

### Backend Setup

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Jeffrey-Le/Workout-Tracker
   cd back-end
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Database Setup:**
   - Create a PostgreSQL user and database:
     ```sql
     CREATE USER "35LbsAdmin" WITH PASSWORD 'password';
     CREATE DATABASE workoutdb OWNER "35LbsAdmin";
     ```
   - Run the SQL schema file:
     ```bash
     psql -U 35LbsAdmin -d workoutdb -f workoutDB-Setup.sql
     ```

4. **Configure Environment Variables:**
   - Create a `.env` file in the `backend` directory with the following:
     ```
     DB_HOST=localhost
     DB_PORT=5432
     DB_NAME=workoutdb
     DB_USER=35LbsAdmin
     DB_PASSWORD=password
     JWT_SECRET=YourJWTSecret
     JWT_EXPIRATION=1h
     ```

5. **Start the Backend Server:**
   ```bash
   node app.js
   ```

   The server will run on `http://localhost:5001`.

---

### Frontend Setup

1. **Navigate to the Frontend Directory:**
   ```bash
   cd frontend
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Start the React Development Server:**
   ```bash
   npm start
   ```

   The app will run on `http://localhost:3000`.

---

## Usage

1. **Register a User:**
   - Navigate to the registration page and create an account.
   - Enter details like username, email, and password.

2. **Log Workouts:**
   - Add workout details, including type, duration, and notes.
   - View the logged workouts on the dashboard.
   - Delete the logged workouts on the dashboard.

3. **Search Workouts:**
   - Use the search interface to filter workouts by type and date.

4. **Track BMI:**
   - Log weight and track BMI trends over time.

5. **Manage Profile:**
   - Update user details and upload profile pictures.

---

## Testing the API

### Using Postman
1. Install [Postman](https://www.postman.com/downloads/).
2. Test API endpoints:
   - **Register:**
     - Endpoint: `POST /register`
     - Body:
       ```json
       {
         "username": "testuser",
         "email": "testuser@example.com",
         "password": "password123",
         "age": 25,
         "height": 170
       }
       ```
   - **Login:**
     - Endpoint: `POST /login`
     - Body:
       ```json
       {
         "username": "testuser",
         "password": "password123"
       }
       ```

---

## Project Requirements Coverage

### Core Requirements
- **Dynamic Data Display:** Displays workout logs, BMI trends, and profile updates.
- **Data Upload and Persistence:** Logs workouts and persists user details.
- **Search Functionality:** Provides meaningful search through workout logs.
- **Authentication:** Secure login and JWT-based authentication.
- **Code Execution:** Contains significant client and server-side logic.


---

## Contributors

- **Group Number:** 1
- **Members:**
  - Joseph Seok - MisterInsomniac
  - Wanxin Xiao - feliciathestar
  - Daniel Luan - daluan217
  - Jeffrey Le - Jeffrey-Le
  - Imaan Soltanalipour - wimaan3

---

