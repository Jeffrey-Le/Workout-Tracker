const express = require('express');
const bodyParser = require('body-parser');
//const cors = require('cors');

// REQUIRE ROUTES
const UserRoutes = require("./routes/userRoutes");
const WorkoutRoutes = require("./routes/workoutRoutes");
const ReminderRoutes = require("./routes/reminderRoutes");

// TEST: console.log(dotenv);

const app = express();
app.use(express.json());

// Middleware
//app.use(cors());
app.use(bodyParser.json());

// Default route (can be used to check if the server is running)
app.get('/', (req, res) => {
    const status = {
        "Status": "Running"
    };

    response.send(status);
});

// Error handling middleware (optional, but good for handling errors globally)
app.use((err, req, res, next) => {
    console.error(err.stack);  // Log the error
    res.status(500).json({ error: 'Something went wrong!' });  // Send a generic error response
});

app.use("/api/users", UserRoutes);
app.use("/api/workouts", WorkoutRoutes);
app.use("/api/reminders", ReminderRoutes);

module.exports = app;
