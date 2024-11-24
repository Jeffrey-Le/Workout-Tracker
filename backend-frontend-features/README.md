

---

# Backend-to-Frontend Features

### **Overview**
This folder contains examples of backend-to-frontend integration features. Each file is how specific backend endpoints can be used within frontend JavaScript code. These examples are designed to help teammates integrate backend logic into their respective frontend implementations efficiently. I will be using the search-workout.js to create the search feature for the website.

### **Folder Structure**
- **`graphing-bmi.js`**: Provides functionality for fetching and displaying BMI graph data.
- **`log-delete-workout.js`**: Demonstrates how to log and delete workout data using backend API endpoints.
- **`search-workout.js`**: Contains the logic for searching workouts by date, type, or both.

---

## **Integration Instructions**

Each file is designed as an example that teammates can copy and refactor into their own frontend projects. Below is an explanation of each feature and how to use it.

### **1. `graphing-bmi.js`**
#### **Purpose**:
Fetches weekly BMI averages for the current year and prepares the data for visualization.

#### **Integration Steps**:
1. Use the `/bmi-graph` endpoint in your frontend to fetch BMI data.
2. This data can be used to render graphs using libraries like Chart.js or D3.js.

#### **API Endpoint**:
- **GET** `/bmi-graph`
- **Response Example**:
    ```json
    [
      { "week": "2024-01-01T00:00:00.000Z", "average_bmi": 22.5 },
      { "week": "2024-01-08T00:00:00.000Z", "average_bmi": 23.1 }
    ]
    ```

---

### **2. `log-delete-workout.js`**
#### **Purpose**:
Demonstrates backend interaction for logging a new workout and deleting an existing workout.

#### **Integration Steps**:
1. Use the provided code to handle workout logging via the `/workouts` endpoint.
2. Use the `/workouts/:id` endpoint to delete workouts by their unique IDs.

#### **API Endpoints**:
- **POST** `/workouts` (Log a workout)
- **DELETE** `/workouts/:id` (Delete a workout)

#### **Expected Data for POST**:
```json
{
  "duration": 30,
  "distance": 5.0,
  "workoutType": "Running",
  "sets": 3,
  "reps": 10,
  "weight_used": 50
}
```

---

### **3. `search-workout.js`**
#### **Purpose**:
Implements workout search functionality by date, type, or both.

#### **Integration Steps**:
1. Use the `/workouts/search` endpoint to filter workouts based on user input.
2. Pass query parameters (`date` and `type`) to refine the search results.

#### **API Endpoint**:
- **GET** `/workouts/search`
- **Query Parameters**:
    - `date`: Specific workout date (e.g., `2024-11-24`).
    - `type`: Type of workout (e.g., `Running`).

#### **Response Example**:
```json
[
  {
    "workout_id": 1,
    "user_id": 1,
    "workout_type": "Running",
    "duration": 30,
    "distance": 5.0,
    "workout_date": "2024-11-24"
  }
]
```

---

## **General Notes**
- These examples assume the backend API is running and accessible.
- Make sure to import necessary dependencies (e.g., `fetch` or `axios`) in your frontend project.
- Ensure the user is authenticated, and include the `Authorization: Bearer <JWT>` header in API calls.

---

## **Support**
For questions reach to me at imaansoltan@gmail.com

--- 

