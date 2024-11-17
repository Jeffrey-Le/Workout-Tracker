const router = require("express").Router();

const WorkoutController = require("../controllers/workoutController");

router.get("/:id", WorkoutController.getWorkout);
router.get("/user:id", WorkoutController.getWorkoutByUser);
router.get("/date", WorkoutController.getWorkoutByDate);
router.post("/add", WorkoutController.addWorkout);
router.put("/update", WorkoutController.updateWorkoutByID);
router.delete("/delete/:id", WorkoutController.deleteWorkoutByID);

module.exports = router;