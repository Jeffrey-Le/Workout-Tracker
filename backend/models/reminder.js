const Model = require('./index');
class ReminderModel extends Model {
    static tableName = 'reminders';
    static primaryKey = 'reminder_id';

    /**
     * @param {Object} reminderData - Contains reminder credentials related to table
     * @returns {Promise<Reminder[]>} - Returns an object list of reminders and data relating to them
     */
    static async createReminder(reminderData) {
        return await this.table.insert(reminderData).returning('*');
    }

    /**
     * @param {Date} date - Contains date
     * @returns {Promise<Object | undefined>} - Returns an object list of reminders and data relating to them for the user based on the date specified
     */
    static async findByDate(date) {
        try {
            return await this.table.where('reminder_date', date).select('*');
        }
        catch (error) {
            throw new Error('Error retreiving reminders for specified date.')
        }
    }

    /**
     * @param {integer} reminderID - Contains the ID of the reminder to search for
     * @param {Object} data - Contains new reminder credentials that match table
     * @returns {Promise<String>} - Returns a message that entry is successfully updated
     */
    static async updateReminder(reminderID, data) {
        return this.updateByID(reminderID, data);
    }

     /**
     * @param {integer} reminderID - Contains the ID of the reminder to search for
     * @returns {Promise<String>} - Returns a message that entry is successfully deleted
     */
     static async deleteReminder(reminderID) {
       return this.deleteByID(reminderID);
    }
}

module.exports = ReminderModel;