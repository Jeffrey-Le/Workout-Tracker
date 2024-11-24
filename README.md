

---

# **Workout Tracker - Database Setup and Backend Features**

This branch, `database-setup-imaan`, contains the foundational database setup, backend configurations, and example integrations for connecting the backend and frontend. It is designed to help our teammates to set up the database and implement backend-to-frontend integration for the Workout Tracker application.

---

## **Contents**

### 1. **Backend Folder**
Contains the core database setup and configuration files.

- **`setup.sql`**: 
  - The SQL script to initialize the PostgreSQL database schema. 
  - Includes tables for `users`, `workouts`, `bmi_history`, and `reminders`.
  - Run this file to set up your database:
    ```bash
    psql -U postgres -d workout_tracker_test -f backend/setup.sql
    ```

### 1/2. **This folder**
- **`.env.example`**:
  - Example environment variables file. Includes placeholders for database connection settings and JWT configuration.
  - To use this file:
    ```bash
    cp backend/.env.example backend/.env
    ```
    Fill in the details for:
    ```plaintext
    DB_HOST=localhost
    DB_PORT=5432
    DB_NAME=workout_tracker_test
    DB_USER=test_user
    DB_PASSWORD=your_password
    JWT_SECRET=your_jwt_secret
    JWT_EXPIRATION=1h
    ```

- **`README.md`**:
  - Documentation specific to the backend setup. Explains how to configure the database, run the setup script, and connect your backend to PostgreSQL using the provided `.env` file.

---

### 2. **backend-to-frontend-features Folder**
Contains example files to assist frontend developers in integrating the backend functionality into their React components or other client-side frameworks.

- **`README.md`**:
  - Explains how to use the example files in the folder.
  - Describes the purpose of each file and provides integration instructions.

- **`log-delete-workout.js`**:
  - Backend code to log and delete workouts.
  - Includes:
    - **POST `/workouts`**: Log a workout with duration, distance, type, etc.
    - **DELETE `/workouts/:id`**: Delete a specific workout by ID.

- **`graphing-bmi.js`**:
  - Backend code to fetch BMI graph data.
  - Includes:
    - **GET `/bmi-graph`**: Fetch weekly BMI averages for the current year, grouped by week.

- **`search-workout.js`**:
  - Backend code to implement search functionality.
  - Includes:
    - **GET `/workouts/search`**: Search for workouts by date, type, or both.

---

### 3. **Top-Level Files**
- **`LICENSE`**:
  - The licensing information for this project.

- **`README.md`**:
  - This file provides a complete overview of the branch, its structure, and its usage.

---

## **Setup Instructions**

### 1. **Set Up the Database**
Follow the instructions in the `backend/README.md` file to configure and initialize the PostgreSQL database.

### 2. **Environment Variables**
- Copy `.env.example` from the `backend` folder and create a `.env` file.
- Update the `.env` file with your database credentials and JWT secret.

### 3. **Run the Cloud SQL Proxy (if using Google Cloud)**
- Follow the instructions in the `backend/README.md` file to start the Cloud SQL Auth Proxy and connect securely to the Google Cloud SQL instance.

### 4. **API Integration**
- Use the examples provided in the `backend-frontend-features` folder to integrate the backend functionality into your frontend code.

---

## **Purpose of Each Folder**
### **Backend Folder**
- Focused on setting up and configuring the database for the Workout Tracker application.
- Contains the database schema and environment configuration.

### **Backend-to-Frontend Features Folder**
- Contains reusable backend code snippets for logging workouts, deleting workouts, fetching BMI data, and searching workouts.
- Designed to help team to integrate backend functionality into their codebase.

---

## **Contributing**
To contribute to this branch:
1. Create a new feature branch based on `database-setup-imaan`:
   ```bash
   git checkout -b feature-your-name
   ```
2. Make changes, add commits with meaningful messages, and push your branch:
   ```bash
   git push origin feature-your-name
   ```
3. Create a pull request to merge into `database-setup-imaan`.

---

## **Contact**
If you encounter any issues or need clarification, please reach out to me at imaansoltan@gmail.com or consult the `README.md` files in each folder.

---
