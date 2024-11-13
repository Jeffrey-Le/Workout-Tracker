const WorkoutModel = require("../models/workout");

class WorkoutController {
    static async addWorkout(req, res) {
        try {
            const workoutData = req.body;

            const newWorkout = WorkoutModel.createWorkout(workoutData);

            return res.status(200).json(newWorkout);
        }
        catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

    static async getWorkout(req, res) {
        try {

            return res.status(200).json({message: "successful call request"})
            const { id } = req.params;

            const workout = WorkoutModel.findOneById(id);

            if (workout)
                res.status(200).json(workout);
            else
                res.status(404).json({ message: 'Workout not found' });
        }
        catch (err) {
            return res.status(500).json({ error: err.message });
          }
    }

    static async getWorkoutByUser(req, res) {
        try {
            const { id } = req.params;

            const workout = WorkoutModel.findByUser(id);

            if (workout)
                res.status(200).json(workout);
            else
                res.status(404).json({ message: 'Workout not found for user' });
        }
        catch (err) {
            return res.status(500).json({ error: err.message });
          }
    }

    static async updateWorkoutByID(req, res) {
        try {
            const newWorkoutData = req.body;

            const updatedWorkout = WorkoutModel.updateWorkout(newWorkoutData.id, newWorkoutData.data);

            if (updatedWorkout)
                res.status(200).json(updatedWorkout);
            else
                res.status(404).json({ message: 'Workout cannot be updated' });
        }
        catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

    static async deleteWorkoutByID(req, res) {
        try {
            const { id } = req.params;

            const deletedWorkout = WorkoutModel.deleteWorkout(id);

            if (deletedWorkout)
                res.status(200).json(deletedWorkout);
            else
                res.status(404).json({ message: 'Workout cannot be deleted' });
        }
        catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }
}

module.exports = WorkoutController;