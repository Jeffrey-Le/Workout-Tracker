const express = require('express');
const router = express.Router();
const authenticeToken = require("../middleware/authMiddleware");
const WorkoutController = require("../controllers/workoutController");

router.use(authenticeToken);

router.delete("/delete/:id", WorkoutController.deleteWorkoutByID);
router.put("/update", WorkoutController.updateWorkoutByID);
router.post("/add", WorkoutController.addWorkout);
router.get("/activity", WorkoutController.getWorkoutsByYear);
router.get("/user/:id", WorkoutController.getWorkoutByUser);
router.get("/:id", WorkoutController.getWorkout);
router.get("/date", WorkoutController.getWorkoutByDate);
router.get('/', WorkoutController.getAllWorkouts);

module.exports = router;