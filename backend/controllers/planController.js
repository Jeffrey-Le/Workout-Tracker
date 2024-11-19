const PlanModel = require("../models/plan");

class PlanController {
    /** 
     * Adds and Creates a new Plan field in the database.
     * @param {Promise<Object>} req - The request header; Will contain information involving plan credentials
     * @param {Promise<Object>} res - The response header; Will allow information to be sent to client 
     * @returns {Promise<Object>} - Returns the newly created plan object
     */
    static async addPlan(req, res) {
        try {
            const {planName} = req.body;

            if (!planName)
                return res.status(404).json({message: "Insufficient data sent."});

            const planData = {
                "plan_name": planName,
            };

            const newPlan = PlanModel.createPlan(planData);

            return res.status(200).json(newPlan);
        }
        catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

     /** 
     * Fetches a single plan by the plan ID.
     * @param {Promise<Object>} req - The request header; Will contain information involving plan credentials => In this case, the params means the ID is in the HTTP request.
     * @param {Promise<Object>} res - The response header; Will allow information to be sent to client 
     * @returns {Promise<Object>} - Returns the plan object if it can be found
     */
    static async getPlan(req, res) {
        try {
            const { id } = req.params;

            const plan = PlanModel.findOneById(id);

            if (plan)
                res.status(200).json(plan);
            else
                res.status(404).json({ message: 'Plan not found' });
        }
        catch (err) {
            return res.status(500).json({ error: err.message });
          }
    }

    /** 
     * Fetches all plans for a user for the specified date.
     * @param {Promise<Object>} req - The request header; Will contain information involving plan credentials => In this case, only contains the date string.
     * @param {Promise<Object>} res - The response header; Will allow information to be sent to client 
     * @returns {Promise<Object>} - Returns the plans objects if it can be found
     */
    static async getPlanByDate(req, res) {
        try {
            const { date } = req.body;

            const formattedData = formatTimestamp(date);

            const plans = PlanModel.findByDate(formattedData);

            if (plans)
                res.status(200).json(plans);
            else
                res.status(404).json({ message: 'Plans not found for user for specified date' });
        }
        catch (err) {
            return res.status(500).json({ error: err.message });
          }
    }

    /** 
     * Fetches all plans for a user by their user ID.
     * @param {Promise<Object>} req - The request header; Will contain information involving plan credentials => In this case, the params means the ID is in the HTTP request.
     * @param {Promise<Object>} res - The response header; Will allow information to be sent to client 
     * @returns {Promise<Object>} - Returns the plan objects if it can be found
     */
    static async getPlanByUser(req, res) {
        try {
            const { id } = req.params;

            const plans = PlanModel.findByUser(id);

            if (plans)
                res.status(200).json(plans);
            else
                res.status(404).json({ message: 'Plans not found for user' });
        }
        catch (err) {
            return res.status(500).json({ error: err.message });
          }
    }

    /** 
     * Searches the user's plans by plan ID and updates the information for the plan.
     * @param {Promise<Object>} req - The request header; Will contain information involving plan credentials
     * @param {Promise<Object>} res - The response header; Will allow information to be sent to client 
     * @returns {Promise<Object>} - Returns the plan object if it can be updated
     */
    static async updatePlanByID(req, res) {
        try {
            const {id, planName} = req.body;

            if (typeof id !== "number" || !id)
                return res.status(404).json({message: "Insufficient data sent. Possible Invalid ID."});

            const newPlanData = {};

            if (planName)
                newPlanData.plan_name = planName;

            const updatedPlan = PlanModel.updatePlan(id, newPlanData);

            if (updatedPlan)
                res.status(200).json(updatedPlan);
            else
                res.status(404).json({ message: 'Plan cannot be updated' });
        }
        catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

    /** 
     * Searches the user's plans by plan ID and deletes the plan.
     * @param {Promise<Object>} req - The request header; Will contain information involving plan credentials => In this case, the params means the ID is in the HTTP request.
     * @param {Promise<Object>} res - The response header; Will allow information to be sent to client 
     * @returns {Promise<Object>} - Returns the plan object if it can be deleted
     */
    static async deletePlanByID(req, res) {
        try {
            const { id } = req.params;

            const deletedPlan = PlanModel.deletePlan(id);

            if (deletedPlan)
                res.status(200).json(deletedPlan);
            else
                res.status(404).json({ message: 'Plan cannot be deleted' });
        }
        catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }
}

module.exports = PlanController;