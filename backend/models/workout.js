const Model = require("./index");

const db = require("../config/db");

// WorkoutModel class will extend Base Model class
// Implement any key functions to interact with workouts table in database here
class WorkoutModel extends Model {
    static tableName = 'workouts';
    static primaryKey = 'workout_id';
    
    /**
     * @param {Object} workoutData - Contains workout credentials related to table
     * @returns {Promise<Workout[]>} - Returns an object list of workouts and data relating to them
     */
    static async createWorkout(workoutData) {
        try {
            // Temporarily set a default `user_id` for testing
            workoutData.user_id = workoutData.user_id || 27;
    
            console.log('Workout Data:', workoutData); // Log input data
            console.log('Generated SQL:', this.table.insert(workoutData).toString());
            console.log('Workout Data Sent to Knex:', workoutData);
    
            // Insert workout data into the table
            return await this.table.insert(workoutData).returning('*');
        } catch (error) {
            console.error('Database Error:', error); // Log detailed error
            console.error('Error creating workout:', error.message);
            throw new Error('Error creating new workout.');
        }
    }
    

    

    /**
     * @param {Date} date - Contains date
     * @returns {Promise<Object | undefined>} - Returns an object list of workouts and data relating to them for the user based on the date created
     */
    static async findByDate(date) {
        try {
            return await this.table.where('workout_date', date).select('*');
        } catch (error) {
            throw new Error("Error retrieving workouts for the specified date.");
        }
    }

    /**
     * @param {integer} workoutID - Contains the ID of the workout to search for
     * @param {Object} data - Contains new workout credentials that match table
     * @returns {Promise<String>} - Returns a message that entry is successfully updated
     */
    static async updateWorkout(workoutID, data) {
        return this.updateByID(workoutID, data);
    }

    /**
     * @param {integer} workoutID - Contains the ID of the workout to search for
     * @returns {Promise<String>} - Returns a message that entry is successfully deleted
     */
    static async deleteWorkout(workoutID) {
        return this.deleteByID(workoutID);
    }


    static async findAll() {
        try {
            return await this.table.select('*');
        } catch (err) {
            throw new Error('Error fetching workouts.');
        }
    }

    /**
     * @param {integer} user_id - Contains the ID of the user
     * @param {integer} year - Contains a year
     * @returns {Promise<String>} - Returns the data for the specified user and year
     */
    static async findByYear(user_id, year) {
        try {
            return await db('workouts').select(
                db.raw("EXTRACT(MONTH FROM workout_date)::int AS month"),
                db.raw("EXTRACT(DAY FROM workout_date)::int AS day"),
                'workout_type',
                'duration',
                'distance',
                'calories',
                'sets',
                'reps',
                'weight_used',
                'details'
            )
            .whereRaw('EXTRACT(YEAR FROM workout_date) = ?', [year])
            .andWhere('user_id', user_id)
            .orderByRaw("EXTRACT(MONTH FROM workout_date), EXTRACT(DAY FROM workout_date)");
            
        } catch (error) {
            console.error('Error fetching workout logs:', error); // Log detailed error
            throw new Error("Error retrieving workouts for the specified year and user.");
        }
    }
}

module.exports = WorkoutModel;