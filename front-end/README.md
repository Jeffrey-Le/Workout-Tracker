

# Workout Tracker Frontend

This is the **frontend** for the Workout Tracker application, providing the user interface for logging workouts, searching data, and managing user profiles. It integrates with the backend API located in the `back-end` folder.

For full project details, refer to the [main README](../README.md) in the root directory.

---

## Features

- **Dynamic Dashboard**: Displays logged workouts and BMI history.
- **Workout Logging**: Enables users to log new workouts with detailed attributes like type, duration, and calories burned.
- **Search Workouts**: Search and filter workouts by type or date.
- **Profile Management**: View and update user information.
- **Authentication**: Secures user data with token-based authentication.

---

## Prerequisites

- **Node.js** (LTS version recommended)
- **npm** (comes with Node.js)

---

## Setup Instructions

1. Navigate to the `front-end` directory:
   ```bash
   cd front-end
   ```

2. Install the required dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```
   The app will run at [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
node_modules/

public/
├── icons.svg         # Static assets (icons)
├── index.html        # Root HTML file for the app

src/
├── pages/            # Individual pages for the app
│   ├── chart.css     # Styles for Chart.js visualizations
│   ├── chart.js      # Visualization of BMI data trends
│   ├── dashboard.js  # Displays workout and BMI data
│   ├── log_workout.js# Form for logging workouts
│   ├── login.js      # User login page
│   ├── profile.css   # Styles for the profile page
│   ├── profile.js    # User profile management
│   ├── register.js   # User registration page
│   ├── search.css    # Styles for the search page
│   ├── search.js     # Search and filter workouts
├── services/         # Helper services for API and authentication
│   ├── api.js        # Interfaces with backend API endpoints
│   ├── auth.js       # Manages user authentication
├── App.js            # Main routing and layout for the app
├── index.js          # Entry point for React
├── styles.css        # Global styles

package-lock.json
package.json
README.md
```

---

## Key Scripts

### `npm start`
Starts the React development server at [http://localhost:3000](http://localhost:3000). The server reloads automatically when code changes.

### `npm run build`
Builds the app for production. Minified static files are generated in the `build/` directory.

---

## Notes for Developers

- Ensure the backend API is running at [http://localhost:5001](http://localhost:5001) for the frontend to function properly.
- Use the login or register pages to authenticate users before accessing protected features.
- The `public/icons.svg` file contains static assets used across the app.
- Update the `.env` file for any environment-specific configurations.

---

For complete project details, refer to the [main README](../README.md).

---
