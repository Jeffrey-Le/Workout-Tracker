const Model = require("./index")

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
            workoutData.user_id = workoutData.user_id || 1;
    
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
    
}

module.exports = WorkoutModel;