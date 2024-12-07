

---

# Workout Tracker App

## Overview

The **Workout Tracker App** is a full-stack web application designed for logging and managing fitness activities. It offers features for tracking workouts, analyzing BMI trends, and managing user profiles, ensuring a seamless and dynamic user experience.

## Features

### Core Features

1. **Dynamic Data Display**
   - Real-time display of workout logs, activity statistics, and BMI trends.

2. **Data Upload and Persistence**
   - Log workouts with details such as type, duration, distance, and notes.
   - Delete workouts as needed.

3. **Search Functionality**
   - Search workouts by type and date.
   - Fetch and display results dynamically from the backend.

4. **Secure Authentication**
   - Implements JWT for user authentication.
   - Hashes passwords using `bcrypt` for enhanced security.

5. **User Profile Management**
   - Edit and manage personal details including username, email, and height.
   - Upload and manage profile pictures.

6. **BMI Tracking**
   - Log and visualize BMI trends with monthly breakdowns.
   - Analyze BMI changes over time using interactive charts.

## Technology Stack

### Frontend

- **Frameworks and Libraries:**
  - React.js
  - Chart.js
  - Axios
  - Lucide React
  - React Router
  - React Image Gallery

- **Styling:**
  - Tailwind CSS
  - Custom CSS

### Backend

- **Framework:**
  - Node.js with Express.js

- **Database:**
  - PostgreSQL

- **Authentication:**
  - JSON Web Tokens (JWT)

- **Security:**
  - Password hashing using `bcrypt`

---

## Installation and Setup

### Prerequisites

Before setting up the **Workout Tracker App**, ensure that your system meets the following prerequisites:

1. **Install Git:**
   - **Windows:**
     - Download and install Git from the [official website](https://git-scm.com/download/win).
   - **MacOS:**
     - Install Git via Homebrew:
       ```bash
       brew install git
       ```
   - **Linux:**
     - Install Git using your distribution's package manager. For example, on Ubuntu:
       ```bash
       sudo apt update
       sudo apt install git
       ```

2. **Install Docker:**
   - **Windows and MacOS:**
     - Download and install Docker Desktop from the [Docker official website](https://www.docker.com/products/docker-desktop/).
     - Follow the installation instructions specific to your operating system.
     - **Note:** Docker Desktop includes Docker Compose.

   - **Linux:**
     - Follow the official Docker installation guide for [Linux](https://docs.docker.com/engine/install/).
     - Additionally, install Docker Compose:
       ```bash
       sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
       sudo chmod +x /usr/local/bin/docker-compose
       ```
       - Verify installation:
         ```bash
         docker-compose --version
         ```

3. **Enable Docker Buildx:**
   - **Docker Buildx** is a CLI plugin for extended build capabilities with Docker. It's included by default in Docker Desktop (Windows/MacOS) and Docker Engine (Linux) from version 19.03 onwards.
   
   - **Verify Buildx Installation:**
     ```bash
     docker buildx version
     ```
     - You should see version information if Buildx is installed correctly.

4. **Configure Docker to Use Buildx:**
   - **Why Enable Buildkit/Buildx?**
     - Buildkit is a modern backend for Docker builds that offers improved performance, better caching, and new features. Enabling it ensures that Docker can efficiently build and manage multi-stage builds, which are often used in complex applications like the Workout Tracker App.

   - **For Linux Users:**
     1. **Edit the Docker Daemon Configuration:**
        - Open the `daemon.json` file using a text editor like `nano`:
          ```bash
          sudo nano /etc/docker/daemon.json
          ```
        - If the file doesn't exist, this command will create it.
     2. **Add the Following Configuration to Enable Buildkit:**
        ```json
        {
          "features": {
            "buildkit": true
          }
        }
        ```
        - **Explanation:**
          - The `"buildkit": true` setting enables Docker's Buildkit features.
     3. **Save and Exit:**
        - In `nano`, press `CTRL + O` to write out the changes.
        - Press `CTRL + X` to exit the editor.
     4. **Restart Docker to Apply Changes:**
        ```bash
        sudo systemctl restart docker
        ```
     5. **Verify Buildkit is Enabled:**
        ```bash
        docker buildx version
        ```
        - Ensure that Buildx is active and functioning.

   - **For Windows and MacOS Users:**
     1. **Open Docker Desktop:**
        - Click on the Docker icon in your system tray and select **Settings**.
     2. **Navigate to Docker Engine Settings:**
        - Go to **Settings** > **Docker Engine**.
     3. **Add/Modify the Configuration to Enable Buildkit:**
        ```json
        {
          "features": {
            "buildkit": true
          }
        }
        ```
        - **Explanation:**
          - Similar to Linux, this configuration enables Buildkit.
     4. **Apply and Restart Docker Desktop:**
        - Click **Apply & Restart** to save changes and restart Docker with the new configuration.
     5. **Verify Buildkit is Enabled:**
        - Open a new terminal and run:
          ```bash
          docker buildx version
          ```
          - Ensure that Buildx is active and functioning.

### Step-by-Step Setup

#### Step 1: Clone the Repository

1. **Open Terminal:**
   - **Windows:** Use Command Prompt, PowerShell, or Git Bash.
   - **MacOS/Linux:** Use the default terminal application.

2. **Navigate to Desired Directory:**
   ```bash
   cd /path/to/your/projects/directory
   ```

3. **Clone the Repository:**
   ```bash
   git clone https://github.com/Jeffrey-Le/Workout-Tracker.git
   cd Workout-Tracker
   ```

#### Step 2: Configure Environment Variables

1. **Create a `.env` File:**
   - In the root `Workout-Tracker` directory, create a file named `.env`.
   - You can use `nano` (Linux/MacOS) or any text editor of your choice.
   ```bash
   nano .env
   ```

2. **Add Configuration Variables:**
   - Paste the following the exact content into the `.env` file of your directory:
     ```plaintext
     # Database Configuration
     POSTGRES_USER=35LbsAdmin
     POSTGRES_PASSWORD=35LbsA+
     POSTGRES_DB=workoutdb
     DB_HOST=db
     DB_PORT=5432
     DB_NAME=workoutdb
     DB_USER=35LbsAdmin
     DB_PASSWORD=35LbsA+
     
     # JWT Configuration
     JWT_SECRET=supersecretkey
     JWT_EXPIRATION=1h

     # Frontend Configuration
     REACT_APP_API_URL=http://localhost:5001
     ```

3. **Save and Exit:**
   - In `nano`, press `CTRL + O` to save and `CTRL + X` to exit.

#### Step 3: Initialize the Database

1. **Database Setup:**
   - The PostgreSQL database will be initialized automatically using the `docker-compose.yml` and the `workoutDB-Setup.sql` script located in the `/docker-entrypoint-initdb.d/` directory.


#### Step 4: Build and Run the Application

1. **Ensure You Are in the Project Directory:**
   - You should be in the root `Workout-Tracker` directory where the `docker-compose.yml` file is located.
   ```bash
   cd /path/to/Workout-Tracker
   ```

2. **Start the Docker Services:**
   ```bash
   docker-compose up --build
   ```
   - **What This Command Does:**
     - **`--build`:** Forces Docker to rebuild the images, ensuring that any changes are incorporated.
     - **`up`:** Builds, (re)creates, starts, and attaches to containers for a service.
     If you face issues with the port being in use already when you are running multiple instances just go to line 14 in docker-compose.yml and follow its comment instructions 

3. **Understanding the Output:**
   - **Database (`workout_tracker_db`):**
     - Initialization messages indicating the creation of tables and readiness to accept connections.
     - Notices about tables not existing initially are normal on the first run.
   - **Backend (`workout_tracker_backend`):**
     - Logs indicating that the server is listening on `http://localhost:5001`.
     - Ensure there are no critical errors in the backend logs.
   - **Frontend (`workout_tracker_frontend`):**
     - Deprecation warnings related to `webpack-dev-server` (these won't prevent the app from running but should be addressed in future updates).
     - Confirmation that the development server has started and is listening on `http://localhost:3000`.

   - **Successful Startup Indicators:**
     - **Database:** Logs indicate that the database system is ready to accept connections.
     - **Backend:** Logs like `Workout Tracker App listening at http://localhost:5001`.
     - **Frontend:** Logs like `Compiled with warnings` and confirmation of the development server.

4. **Accessing the Application:**
   - **Frontend:** Open your web browser and navigate to [http://localhost:3000](http://localhost:3000).
   - **Backend API:** Accessible at [http://localhost:5001](http://localhost:5001) (for API requests).

#### Step 5: Access the Application

1. **Open Your Web Browser:**
   - Navigate to [http://localhost:3000](http://localhost:3000) to access the Workout Tracker App.

2. **Initial Setup:**
   - **Register a New User:**
     - Click on the "Register" button.
     - Fill in your details (username, email, password, age, gender, height).
     - Submit the form to create a new account.
   - **Log In:**
     - After registration, navigate to the login page.
     - Enter your credentials to access the dashboard.
     - Make sure to log out after you are done.

---

## Additional Commands for Managing Docker

### 1. **Stop the Services**

- **Gracefully Stop All Services:**
  ```bash
  docker-compose down
  ```
  - This stops and removes all containers defined in the `docker-compose.yml` file without deleting the data.

### 2. **Reset the Database**

- **Completely Remove Containers and Volumes:**
  ```bash
  docker-compose down -v
  docker-compose up --build
  ```
  - **What This Does:**
    - The `-v` flag removes the Docker volumes, effectively deleting all database data.
    - Re-running `docker-compose up --build` will rebuild the containers and re-initialize the database.

  - **Warning:**
    - This will erase **all** data in your PostgreSQL database. Use with caution, especially in a production environment.

### 3. **Check Running Containers**

- **List All Running Containers:**
  ```bash
  docker ps
  ```

### 4. **View Logs**

- **View Real-Time Logs for All Services:**
  ```bash
  docker-compose logs -f
  ```
  - **What This Does:**
    - Streams logs from all containers, allowing you to monitor their activity in real-time.

### 5. **Rebuild Specific Services**

- **Rebuild Frontend Only:**
  ```bash
  docker-compose up --build frontend
  ```

- **Rebuild Backend Only:**
  ```bash
  docker-compose up --build backend
  ```

---

## Usage

### 1. **Register a User**

1. **Navigate to Registration Page:**
   - Go to [http://localhost:3000/register](http://localhost:3000/register).

2. **Fill in Registration Details:**
   - Enter your username, email, password, age, gender, and height.
   - Click "Register" to create your account.

### 2. **Log In**

1. **Navigate to Login Page:**
   - Go to [http://localhost:3000/login](http://localhost:3000/login).

2. **Enter Credentials:**
   - Input your registered username and password.
   - Click "Login" to access your dashboard.

### 3. **Log Workouts**

1. **Access Dashboard:**
   - After logging in, you’ll be redirected to the dashboard.

2. **Add a New Workout:**
   - Click on "Log Workout" or navigate to [http://localhost:3000/log_workout](http://localhost:3000/log_workout).
   - Fill in workout details: type, duration, distance, calories, and optional notes.
   - Click "Create" to log the workout.

3. **View Logged Workouts:**
   - Your workouts will appear below the logging form, displaying the date, type, distance, duration, and calories.

4. **Delete a Workout:**
   - Click the delete button (trash icon) at the bottom right of the desired workout card to remove it.

### 4. **Search Workouts**

1. **Navigate to Search Page:**
   - Go to [http://localhost:3000/search](http://localhost:3000/search).

2. **Apply Filters:**
   - Select a workout type and/or choose a date to filter workouts.

3. **View Results:**
   - Click "Search" to display workouts matching your criteria.

### 5. **Track BMI**

1. **Access Profile Page:**
   - Click on your profile picture or navigate to [http://localhost:3000/profile](http://localhost:3000/profile).

2. **Log BMI:**
   - Enter your current weight and select the month.
   - Click "Add BMI" to record your BMI.

3. **View BMI Trends:**
   - BMI trends are visualized using interactive charts, showing monthly averages.

### 6. **Manage Profile**

1. **Edit Profile Details:**
   - On the profile page, update your username, email, age, gender, and height as needed.

2. **Upload Profile Picture:**
   - Click on your profile picture to upload a new image.

---

## Key Notes

1. **Data Persistence:**
   - The PostgreSQL database data is stored in a Docker volume (`db_data`) and persists across container restarts.
   - To fully reset the database, remove the volume using:
     ```bash
     docker-compose down -v
     ```

2. **Environment Variables Security:**
   - **Important:** Do not share sensitive information in `.env` files publicly.
   - For production, ensure environment variables are securely managed and not hard-coded.

3. **Default Credentials:**
   - The app uses the `.env` file to initialize the database and backend.
   - If sharing the repository, ensure the `.env` file is **excluded** (typically via `.gitignore`) to prevent exposing sensitive information.

4. **Ports Configuration:**
   - **Frontend:** [http://localhost:3000](http://localhost:3000)
   - **Backend (API):** [http://localhost:5001](http://localhost:5001)
   - **PostgreSQL Database:** Accessible internally via Docker on port `5432`.

5. **Docker Compose Structure:**
   - **Services Defined:**
     - `db`: PostgreSQL database.
     - `backend`: Node.js/Express server.
     - `frontend`: React application.

6. **Troubleshooting Common Issues:**
   - **Backend 404 Errors:**
     - Ensure that all necessary backend routes are defined (e.g., `DELETE /workouts/:id`).
     - Verify that the frontend is making requests to the correct API endpoints.
   - **Database Connection Issues:**
     - Ensure the `.env` file has correct database credentials.
     - Check if the PostgreSQL container is running without errors.
   - **Buildx Errors:**
     - Ensure Buildx is properly installed and configured.
     - Verify that the Docker daemon has experimental features enabled if required.
     - Recreate the Buildx builder if issues persist:
       ```bash
       docker buildx create --use --name mybuilder
       docker buildx inspect --bootstrap
       ```

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
  - The repository is **public**, so no additional access permissions are required.

---
