const express = require('express');
const router = express.Router();
const authenticateToken = require("../middleware/authMiddleware"); // Corrected variable name
const WorkoutController = require("../controllers/workoutController");

// Apply authentication middleware to all routes
router.use(authenticateToken);

// Additional Endpoints (placed before routes with parameters to avoid conflicts)
router.get('/chart-data', WorkoutController.getChartData); // Get data for charts
router.get('/stats', WorkoutController.getStats); // Get workout statistics
router.get('/search', WorkoutController.searchWorkouts); // Search workouts based on criteria

// CRUD Operations
router.get('/', WorkoutController.getAllWorkouts); // Get all workouts
router.get('/:id', WorkoutController.getWorkoutById); // Get a specific workout by ID
router.post('/', WorkoutController.addWorkout); // Add a new workout
router.put('/:id', WorkoutController.updateWorkoutByID); // Update a workout by ID
router.delete('/:id', WorkoutController.deleteWorkoutByID); // Delete a workout by ID

module.exports = router;
