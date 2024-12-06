

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
2. **npm:** Comes with Node.js.
3. **PostgreSQL:** Download and install from [PostgreSQL official website](https://www.postgresql.org/download/).
   - Ensure that PostgreSQL is properly installed and running on your local machine.

---

### Clone the Repository

```bash
git clone https://github.com/Jeffrey-Le/Workout-Tracker.git
cd Workout-Tracker
```

---

### Backend Setup

1. **Navigate to the Backend Directory:**

   ```bash
   cd back-end
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Database Setup:**

   - **Locate the SQL Schema File:**

     The `workoutDB-Setup.sql` file is located in the `back-end` directory of the cloned repository.

   - **Create a PostgreSQL User and Database:**

     Open your terminal and run the following commands:

     ```bash
     psql postgres
     ```

     In the PostgreSQL shell, run:

     ```sql
     CREATE USER "35LbsAdmin" WITH PASSWORD 'password';
     CREATE DATABASE workoutdb OWNER "35LbsAdmin";
     ```

     Exit the PostgreSQL shell:

     ```sql
     \q
     ```

   - **Run the SQL Schema File:**

     From your terminal, execute:

     ```bash
     psql -U 35LbsAdmin -d workoutdb -f workoutDB-Setup.sql
     ```

     If prompted, enter the password you set ('password').

4. **Configure Environment Variables:**

   - **Create a `.env` File:**

     In the `back-end` directory, create a file named `.env` with the following content:

     ```
     DB_HOST=localhost
     DB_PORT=5432
     DB_NAME=workoutdb
     DB_USER=35LbsAdmin
     DB_PASSWORD=password
     JWT_SECRET=YourJWTSecret
     JWT_EXPIRATION=1h
     PORT=5001
     ```

     - Replace `YourJWTSecret` with a secret key of your choice. This is used for JWT token signing.

5. **Start the Backend Server:**

   ```bash
   node app.js
   ```

   The server will run on `http://localhost:5001`.

---

### Frontend Setup

1. **Navigate to the Frontend Directory:**

   From the root of the project (`Workout-Tracker` directory):

   ```bash
   cd front-end
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

   - Open your browser and navigate to `http://localhost:3000/register`.
   - Create an account by providing details like username, email, and password.

2. **Login:**

   - After registration, navigate to `http://localhost:3000/login`.
   - Enter your credentials to log in.

3. **Log Workouts:**

   - Navigate to the "Log Workout" page.
   - Add workout details, including type, duration, distance, and notes.
   - View and delete logged workouts on the dashboard.

4. **Search Workouts:**

   - Use the search interface to filter workouts by type and date.

5. **Track BMI:**

   - Navigate to the "Profile" page.
   - Log your weight to track BMI trends over time.
   - View BMI charts and analyze changes.

6. **Manage Profile:**

   - Update user details and upload profile pictures on the "Profile" page.

---

## Testing the API

### Using Postman

1. Install [Postman](https://www.postman.com/downloads/).

2. Test API endpoints:

   - **Register:**

     - Endpoint: `POST http://localhost:5001/register`
     - Body (JSON):

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

     - Endpoint: `POST http://localhost:5001/login`
     - Body (JSON):

       ```json
       {
         "username": "testuser",
         "password": "password123"
       }
       ```

   - **Authenticated Requests:**

     - After logging in, you will receive a JWT token.
     - Include this token in the `Authorization` header for protected endpoints:

       ```
       Authorization: Bearer <your_jwt_token>
       ```

   - **Log a Workout:**

     - Endpoint: `POST http://localhost:5001/workouts`
     - Headers:

       ```
       Authorization: Bearer <your_jwt_token>
       ```

     - Body (JSON):

       ```json
       {
         "workoutType": "Running",
         "duration": 30,
         "distance": 5.0,
         "calories": 300,
         "notes": "Morning run"
       }
       ```

---

## Project Requirements Coverage

### Core Requirements

- **Dynamic Data Display:** Displays workout logs, BMI trends, and profile updates in real-time.
- **Data Upload and Persistence:** Logs workouts and persists user details to the database.
- **Search Functionality:** Provides meaningful search through workout logs based on type and date.
- **Authentication:** Secure login and JWT-based authentication.
- **Code Execution:** Contains significant client-side (React components, state management) and server-side logic (Express routes, database interactions).

---

## Contributors

- **Group Number:** 1
- **Members:**
  - Joseph Seok - [MisterInsomniac](https://github.com/MisterInsomniac)
  - Wanxin Xiao - [feliciathestar](https://github.com/feliciathestar)
  - Daniel Luan - [daluan217](https://github.com/daluan217)
  - Jeffrey Le - [Jeffrey-Le](https://github.com/Jeffrey-Le)
  - Imaan Soltanalipour - [wimaan3](https://github.com/wimaan3)

---

## Submission and Access Information

- **GitHub Repository URL:**

  ```
  https://github.com/Jeffrey-Le/Workout-Tracker
  ```

  The repository is public, so no additional access permissions are required.

---

## Notes

- **Environment Variables Security:**

  - Ensure that sensitive information like `DB_PASSWORD` and `JWT_SECRET` are kept secure.
  - Do not commit your `.env` file to version control if it contains sensitive data.

- **Ports Configuration:**

  - The backend runs on port `5001` and the frontend on port `3000`. If these ports are in use, you can change them in the `.env` file (for the backend) and in the `package.json` or startup script (for the frontend).

- **Frontend-Backend Integration:**

  - The frontend is configured to communicate with the backend at `http://localhost:5001`. If you change the backend port or run it on a different host, update the API URLs in the frontend code (usually in `api.js` or similar configuration files).

- **Database Configuration:**

  - **SQL Schema File Location:**

    The `workoutDB-Setup.sql` file required for setting up the database is located in the `back-end` directory of the cloned repository:

    ```
    Workout-Tracker/
      back-end/
        workoutDB-Setup.sql
        ...
    ```

  - Ensure that PostgreSQL is running and that you have created the user and database as specified.
  - Running the `workoutDB-Setup.sql` file is crucial for creating the necessary tables and schemas in your PostgreSQL database.

- **Additional Tips:**

  - If you encounter any issues with dependencies, ensure that you have the correct versions of Node.js and npm installed.
  - For Mac users using Homebrew, you can install PostgreSQL with:

    ```bash
    brew install postgresql
    ```

  - Start PostgreSQL service:

    ```bash
    brew services start postgresql
    ```

---

