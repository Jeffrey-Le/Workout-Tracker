const BmiHistoryModel = require('../models/bmiHistory');

class BmiHistoryController {
    /** 
     * Adds and Creates a new BMI History entry field in the database.
     * @param {Promise<Object>} req - The request header; Will contain information involving BMI history credentials
     * @param {Promise<Object>} res - The response header; Will allow information to be sent to client 
     * @returns {Promise<Object>} - Returns the newly created BMI history entry object
     */
    static async addBMIEntry(req, res) {
        try {
            const {weight, height} = req.body;

            if (!weight || !height)
                return res.status(404).json({message: "Insufficient data sent. Data is not found."});

            if (weight < 0)
                return res.status(422).json({message: "Weight must be a positive number."});

            if (height < 0)
                return res.status(422).json({message: "Height must be a positive number."});

            const bmiData = {
                "weight": weight,
                "height": height
            };

            const newBmi = BmiHistoryModel.createBMI(bmiData);

            return res.status(200).json(newBmi);
        }
        catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

     /** 
     * Fetches a single BMI histroy entry by the BMI histroy entry ID.
     * @param {Promise<Object>} req - The request header; Will contain information involving BMI histroy credentials => In this case, the params means the ID is in the HTTP request.
     * @param {Promise<Object>} res - The response header; Will allow information to be sent to client 
     * @returns {Promise<Object>} - Returns the BMI histroy entry object if it can be found
     */
    static async getBmiEntry(req, res) {
        try {
            const { id } = req.params;

            const bmiEntry = BmiHistoryModel.findOneById(id);

            if (bmiEntry)
                res.status(200).json(bmiEntry);
            else
                res.status(404).json({ message: 'BMI History entry not found' });
        }
        catch (err) {
            return res.status(500).json({ error: err.message });
          }
    }

    /** 
     * Fetches all BMI histroy entries for a user for the specified date.
     * @param {Promise<Object>} req - The request header; Will contain information involving BMI histroy credentials => In this case, only contains the date string.
     * @param {Promise<Object>} res - The response header; Will allow information to be sent to client 
     * @returns {Promise<Object>} - Returns the BMI histroy entries objects if it can be found
     */
    static async getBmiEntriesByDate(req, res) {
        try {
            const { date } = req.body;

            const formattedData = formatTimestamp(date);

            const bmiEntries = BmiHistoryModel.findByDate(formattedData);

            if (bmiEntries)
                res.status(200).json(bmiEntries);
            else
                res.status(404).json({ message: 'BMI History entries not found for user for specified date' });
        }
        catch (err) {
            return res.status(500).json({ error: err.message });
          }
    }

    /** 
     * Fetches all BMI histroy entries for a user by their user ID.
     * @param {Promise<Object>} req - The request header; Will contain information involving BMI histroy credentials => In this case, the params means the ID is in the HTTP request.
     * @param {Promise<Object>} res - The response header; Will allow information to be sent to client 
     * @returns {Promise<Object>} - Returns the BMI histroy entries objects if it can be found
     */
    static async getBmiEntriesByUser(req, res) {
        try {
            const { id } = req.params;

            const bmiEntry = BmiHistoryModel.findByUser(id);

            if (bmiEntry)
                res.status(200).json(bmiEntry);
            else
                res.status(404).json({ message: 'BMI History entry not found for user' });
        }
        catch (err) {
            return res.status(500).json({ error: err.message });
          }
    }

    /** 
     * Searches the user's BMI histroy entries by BMI histroy entry ID and updates the information for the BMI histroy entry.
     * @param {Promise<Object>} req - The request header; Will contain information involving plan credentials
     * @param {Promise<Object>} res - The response header; Will allow information to be sent to client 
     * @returns {Promise<Object>} - Returns the BMI histroy entry object if it can be updated
     */
    static async updateBmiEntryByID(req, res) {
        try {
            const {id, weight, height, bmi} = req.body;

            if (typeof id !== "number" || !id)
                return res.status(400).json({message: "Invalid ID"});

            const newBmiData = {};

            if (weight)
                newBmiData.weight = weight;

            if (height)
                newBmiData.height = height;

            if (bmi)
                newBmiData.bmi = bmi;

            const updatedBmiEntry = BmiHistoryModel.updateBmi(id, newBmiData);

            if (updatedBmiEntry)
                res.status(200).json(updatedBmiEntry);
            else
                res.status(404).json({ message: 'BMI History entry cannot be updated' });
        }
        catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

    /** 
     * Searches the user's BMI history by BMI history ID and deletes the BMI history entry.
     * @param {Promise<Object>} req - The request header; Will contain information involving BMI history credentials => In this case, the params means the ID is in the HTTP request.
     * @param {Promise<Object>} res - The response header; Will allow information to be sent to client 
     * @returns {Promise<Object>} - Returns the BMI history entry object if it can be deleted
     */
    static async deleteBMIEntryByID(req, res) {
        try {
            const { id } = req.params;

            const deletedBMI = BmiHistoryModel.deleteBMI(id);

            if (deletedBMI)
                res.status(200).json(deletedBMI);
            else
                res.status(404).json({ message: 'BMI entry cannot be deleted' });
        }
        catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }
}

module.exports = BmiHistoryController;