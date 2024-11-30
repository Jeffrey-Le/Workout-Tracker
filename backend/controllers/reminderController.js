const ReminderModel = require('../models/reminder');
const formatTimestamp = require('../utils/dataFromat');

class ReminderController {
    /** 
     * Adds and Creates a new Reminder field in the database.
     * @param {Promise<Object>} req - The request header; Will contain information involving reminder credentials
     * @param {Promise<Object>} res - The response header; Will allow information to be sent to client 
     * @returns {Promise<Object>} - Returns the newly created reminder object
     */
    static async addReminder(res, req) {
        try {
            const {reminderDate, message} = req.body;

            const reminderData = {};

            if (reminderDate) reminderData.reminder_date = reminderDate;
            if (message) reminderData.message = message;

            const newReminder = ReminderModel.createReminder(reminderData);

            return res.status(200).json(newReminder);
        }
        catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

    /** 
     * Fetches a single reminder by the reminder ID.
     * @param {Promise<Object>} req - The request header; Will contain information involving reminder credentials => In this case, the params means the ID is in the HTTP request.
     * @param {Promise<Object>} res - The response header; Will allow information to be sent to client 
     * @returns {Promise<Object>} - Returns the reminder object if it can be found
     */
    static async getReminder(req, res) {
        try {

            //return res.status(200).json({message: "successful call request"})
            const { id } = req.params;

            const reminder = ReminderModel.findOneById(id);

            if (reminder)
                res.status(200).json(reminder);
            else
                res.status(404).json({ message: 'Reminder not found' });
        }
        catch (err) {
            return res.status(500).json({ error: err.message });
          }
    }

    /** 
     * Fetches all reminders for a user by their user ID.
     * @param {Promise<Object>} req - The request header; Will contain information involving reminder credentials => In this case, the params means the ID is in the HTTP request.
     * @param {Promise<Object>} res - The response header; Will allow information to be sent to client 
     * @returns {Promise<Object>} - Returns the reminder objects if it can be found
     */
    static async getReminderByUser(req, res) {
        try {
            const { id } = req.params;

            const reminder = ReminderModel.findByUser(id);

            if (reminder)
                res.status(200).json(reminder);
            else
                res.status(404).json({ message: 'Reminders not found for user' });
        }
        catch (err) {
            return res.status(500).json({ error: err.message });
          }
    }

    /** 
     * Fetches all reminders for a user for the specified date.
     * @param {Promise<Object>} req - The request header; Will contain information involving reminder credentials => In this case, only contains the date string.
     * @param {Promise<Object>} res - The response header; Will allow information to be sent to client 
     * @returns {Promise<Object>} - Returns the reminder objects if it can be found
     */
    static async getReminderByDate(req, res) {
        try {
            const { date } = req.body;

            const formattedData = formatTimestamp(date);

            const reminder = ReminderModel.findByDate(formattedData);

            if (reminder)
                res.status(200).json(reminder);
            else
                res.status(404).json({ message: 'Reminders not found for user for specified date' });
        }
        catch (err) {
            return res.status(500).json({ error: err.message });
          }
    }
    
    /** 
     * Searches the user's reminders by reminder ID and updates the information for the reminder.
     * @param {Promise<Object>} req - The request header; Will contain information involving reminder credentials
     * @param {Promise<Object>} res - The response header; Will allow information to be sent to client 
     * @returns {Promise<Object>} - Returns the reminder object if it can be updated
     */
    static async updateReminderByID(req, res) {
        try {
            const {id, reminderDate, message} = req.body;

            if (typeof id !== "number" || !id)
                return res.status(400).json({message: "Invalid ID"});

            const newReminderData = {};

            if (reminderDate) newReminderData.reminder_date = reminderDate;
            if (message) newReminderData.message = message;

            const updatedReminder = ReminderModel.updateReminder(id, newReminderData);

            if (updatedReminder)
                res.status(200).json(updatedReminder);
            else
                res.status(404).json({ message: 'Reminder cannot be updated' });
        }
        catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

    /** 
     * Searches the user's reminders by reminder ID and deletes the reminder.
     * @param {Promise<Object>} req - The request header; Will contain information involving reminder credentials => In this case, the params means the ID is in the HTTP request.
     * @param {Promise<Object>} res - The response header; Will allow information to be sent to client 
     * @returns {Promise<Object>} - Returns the reminder object if it can be deleted
     */
    static async deleteReminderByID(req, res) {
        try {
            const { id } = req.params;

            const deletedReminder = ReminderModel.deleteReminder(id);

            if (deletedReminder)
                res.status(200).json(deletedReminder);
            else
                res.status(404).json({ message: 'Reminder cannot be deleted' });
        }
        catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }
}

module.exports = ReminderController;