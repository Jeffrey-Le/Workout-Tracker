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
            const {workoutType, duration, distance, caloriesBurned, sets, reps, weightUsed, workoutDate, details} = req.body;

            const workoutData = {};

            // Check existence of a certain data that can be added.
            if (workoutType) workoutData.workout_type = workoutType;
            if (duration) workoutData.duration = duration;
            if (distance) workoutData.distance = distance;
            if (caloriesBurned) workoutData.calories_burned = caloriesBurned;
            if (sets) workoutData.sets = sets;
            if (reps) workoutData.reps = reps;
            if (weightUsed) workoutData.weight_used = weightUsed;
            if (workoutDate) workoutData.workout_date = workoutDate;
            if (details) workoutData.details = details;

            const newWorkout = WorkoutModel.createWorkout(workoutData);

            if (newWorkout)
                res.status(200).json(newWorkout);
            else
                res.status(404).json({ message: 'Workout cannot be created.' });
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
            const {id, workoutType, duration, distance, caloriesBurned, sets, reps, weightUsed, workoutDate, details} = req.body;

            if (typeof id !== "number" || !id)
                return res.status(400).json({message: "Invalid ID"});

            const newWorkoutData = {};


            // Check existence of a certain data that can be updated.
            if (workoutType) newWorkoutData.workout_type = workoutType;
            if (duration) newWorkoutData.duration = duration;
            if (distance) newWorkoutData.distance = distance;
            if (caloriesBurned) newWorkoutData.calories_burned = caloriesBurned;
            if (sets) newWorkoutData.sets = sets;
            if (reps) newWorkoutData.reps = reps;
            if (weightUsed) newWorkoutData.weight_used = weightUsed;
            if (workoutDate) newWorkoutData.workout_date = workoutDate;
            if (details) newWorkoutData.details = details;
           

            const updatedWorkout = WorkoutModel.updateWorkout(id, newWorkoutData);

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
    static async getAllWorkouts(req, res) {
        try {
            const workouts = await WorkoutModel.findAll(); // Assuming findAll() is implemented in the WorkoutModel
            if (workouts && workouts.length > 0) {
                res.status(200).json(workouts);
            } else {
                res.status(404).json({ message: 'No workouts found.' });
            }
        } catch (err) {
            console.error('Error fetching workouts:', err.message);
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = WorkoutController;