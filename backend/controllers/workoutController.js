const WorkoutModel = require("../models/workout");

class WorkoutController {
    /** 
     * Adds and Creates a new Workout field in the database.
     * @param {Promise<Object>} req - The request header; Will contain information involving workout credentials
     * @param {Promise<Object>} res - The response header; Will allow information to be sent to client 
     * @returns {Promise<Object>} - Returns the newly created workout object
     */
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

     /** 
     * Fetches a single workout by the workout ID.
     * @param {Promise<Object>} req - The request header; Will contain information involving workout credentials => In this case, the params means the ID is in the HTTP request.
     * @param {Promise<Object>} res - The response header; Will allow information to be sent to client 
     * @returns {Promise<Object>} - Returns the workout object if it can be found
     */
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

    /** 
     * Fetches all workouts for a user for the specified date.
     * @param {Promise<Object>} req - The request header; Will contain information involving workout credentials => In this case, only contains the date string.
     * @param {Promise<Object>} res - The response header; Will allow information to be sent to client 
     * @returns {Promise<Object>} - Returns the workout objects if it can be found
     */
    static async getWorkoutByDate(req, res) {
        try {
            const { date } = req.body;

            const formattedData = formatTimestamp(date);

            const workout = WorkoutModel.findByDate(formattedData);

            if (workout)
                res.status(200).json(workout);
            else
                res.status(404).json({ message: 'Workouts not found for user for specified date' });
        }
        catch (err) {
            return res.status(500).json({ error: err.message });
          }
    }

    /** 
     * Fetches all workout for a user by their user ID.
     * @param {Promise<Object>} req - The request header; Will contain information involving workout credentials => In this case, the params means the ID is in the HTTP request.
     * @param {Promise<Object>} res - The response header; Will allow information to be sent to client 
     * @returns {Promise<Object>} - Returns the workout objects if it can be found
     */
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

    /** 
     * Searches the user's workouts by workout ID and updates the information for the workout.
     * @param {Promise<Object>} req - The request header; Will contain information involving workout credentials
     * @param {Promise<Object>} res - The response header; Will allow information to be sent to client 
     * @returns {Promise<Object>} - Returns the workout object if it can be updated
     */
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

    /** 
     * Searches the user's workouts by workout ID and deletes the workout.
     * @param {Promise<Object>} req - The request header; Will contain information involving workout credentials => In this case, the params means the ID is in the HTTP request.
     * @param {Promise<Object>} res - The response header; Will allow information to be sent to client 
     * @returns {Promise<Object>} - Returns the workout object if it can be deleted
     */
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