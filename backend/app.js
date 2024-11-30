const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize app
const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:3000' })); // Allow requests from frontend
app.use(express.json());
app.use(bodyParser.json());

// REQUIRE ROUTES
const UserRoutes = require("./routes/userRoutes");
const WorkoutRoutes = require("./routes/workoutRoutes");
const ReminderRoutes = require("./routes/reminderRoutes");
const PlanRoutes = require('./routes/planRoutes');
const BmiHistoryRoutes = require('./routes/bmiHistoryRoutes');

// Default route (can be used to check if the server is running)
app.get('/', (req, res) => {
    const status = {
        "Status": "Running"
    };
    res.send(status); // Corrected from response.send to res.send
});

// Error handling middleware (optional, but good for handling errors globally)
app.use((err, req, res, next) => {
    console.error(err.stack);  // Log the error
    res.status(500).json({ error: 'Something went wrong!' });  // Send a generic error response
});

// Routes
app.use("/api/users", UserRoutes);
app.use("/api/workouts", WorkoutRoutes);
app.use("/api/reminders", ReminderRoutes);
app.use("/api/plans", PlanRoutes);
app.use("/api/bmi", BmiHistoryRoutes);


module.exports = app;
