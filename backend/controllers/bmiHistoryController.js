const BmiHistoryModel = require('../models/bmiHistory');

const db = require('../config/db');

class BmiHistoryController {
    /** 
     * Adds and Creates a new BMI History entry field in the database.
     * @param {Promise<Object>} req - The request header; Will contain information involving BMI history credentials
     * @param {Promise<Object>} res - The response header; Will allow information to be sent to client 
     * @returns {Promise<Object>} - Returns the newly created BMI history entry object
     */
    static async addBMIEntry(req, res) {
        try {
            const {user_id, weight, height} = req.body;

            if (typeof user_id !== "number" || !user_id)
                return res.status(400).json({message: "Invalid User ID"});

            if (!weight || !height)
                return res.status(404).json({message: "Insufficient data sent. Data is not found."});

            if (weight < 0)
                return res.status(422).json({message: "Weight must be a positive number."});

            if (height < 0)
                return res.status(422).json({message: "Height must be a positive number."});

            const bmiData = {
                "user_id": user_id,
                "weight": weight,
                "height": height
            };

            const newBmi = BmiHistoryModel.createBmi(bmiData);

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

            const bmiEntry = await BmiHistoryModel.findByUser(id);

            console.log(bmiEntry);

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
     * Fetches the data needed for displaying BMi graph 
     * @param {Promise<Object>} req - The request header; Will contain information involving BMI histroy credentials
     * @param {Promise<Object>} res - The response header; Will allow information to be sent to client 
     * @returns {Promise<Object>} - Returns the BMI histroy entries objects if it can be found
     */
    static async getBmiGraph(req, res) {
        const { max_years = 12 } = req.query;

        try {
            // Fetch available years that have an entry
            const availableYears = await db('bmi_history')
                .select(db.raw('DISTINCT EXTRACT(YEAR FROM recorded_at)::int AS year'))
                .orderBy('year', 'desc')
                .limit(max_years);

            const bmiDataByYear = {};

            // Process data for each year
            for (const row of availableYears) {
                // Fetch BMI averages for the current year
                const averages = await BmiHistoryModel.getAverages(row.year);

                // Create an array of size 12, initialized to null for missing months
                const monthlyAverages = Array(12).fill(null);
                averages.forEach(({ month, average_bmi }) => {
                    monthlyAverages[month - 1] = average_bmi; // Correct month index is month - 1
                });

                // Add the data for the current year to the response object
                bmiDataByYear[row.year] = monthlyAverages;
            }

            res.status(200).json(bmiDataByYear);
        } catch (error) {
            console.error('Error fetching BMI data:', error);
            res.status(500).send('Internal Server Error');
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