const router = require("express").Router();

const WorkoutController = require("../controllers/workoutController");

router.get("/:id", WorkoutController.getWorkout);
//router.get("/:date", WorkoutController.findByDate);
router.post("/add", WorkoutController.addWorkout);
router.put("/update", WorkoutController.updateWorkoutByID);
router.delete("/delete/:id", WorkoutController.deleteWorkoutByID);

module.exports = router;