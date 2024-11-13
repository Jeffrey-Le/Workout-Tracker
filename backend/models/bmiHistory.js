const Model = require('./index');

class BmiHistoryModel extends Model {
    static tableName = 'bmi_history';
    static primaryKey = 'bmi_id';

     /**
     * @param {Object} historyData - Contains BMI History credentials related to table
     * @returns {Promise<BmiHistory[]>} - Returns an object list of workouts and data relating to them
     */
     static async createBmiHistory(historyData) {
        try {
            return await this.table.insert(historyData).returning('*');
        }
        catch (error) {
            throw new Error('Error creating new BMI History.')
        }
    }

    /**
     * @param {Date} date - Contains date
     * @returns {Promise<Object | undefined>} - Returns an object list of workouts and data relating to them for the user based on the date created
     */
    static async findByDate(date) {
        try {
            return await this.table.where('recorded_at', date).select('*');
        } catch (error) {
            throw new Error("Error retrieving BMI History for the specified date.");
        }
    }

    /**
     * @param {integer} historyID - Contains the ID of the BMI History to search for
     * @param {Object} data - Contains new workout credentials that match table
     * @returns {Promise<String>} - Returns a message that entry is successfully updated
     */
    static async updateHistory(historyID, data) {
        return this.updateByID(historyID, data);
    }

    /**
     * @param {integer} historyID - Contains the ID of the BMI History to search for
     * @returns {Promise<String>} - Returns a message that entry is successfully deleted
     */
    static async deleteHistory(historyID) {
        return this.deleteByID(historyID);
    }
}

module.exports = BmiModel;