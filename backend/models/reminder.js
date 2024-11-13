import { Model } from ".";

class ReminderModel extends Model {
    static tableName = 'reminders';
    static primaryKey = 'reminder_id';

    static async createReminder(reminderData) {
        return await this.table.insert(reminderData).returning('*');
    }

    static async findByDate(date) {
        try {
            return await this.table.where('reminder_date', date).select('*');
        }
        catch (error) {
            throw new Error('Error retreiving reminders for specified date.')
        }
    }

    static async updateReminder(reminderID, data) {
        return this.updateByID(reminderID, data);
    }

     // Method to delete a reminder by ID
     static async deleteReminder(reminderID) {
       return this.deleteByID(reminderID);
    }
}