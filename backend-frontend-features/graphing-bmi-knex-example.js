/**
 * Feature: BMI Graph Integration (Knex.js version)
 * Description:
 *  - Provides a backend API endpoint to fetch weekly BMI averages for the current year.
 *  - Uses Knex.js to calculate weekly BMI data from the `bmi_history` table.
 * Instructions:
 * 1. Integrate this code with your frontend code to use the backend
 * 2. Use the `/bmi-graph` endpoint in the frontend to display BMI graphs.
 *
 * Example API Response:
 * [
 *   { "week": "2024-01-01T00:00:00.000Z", "average_bmi": 22.5 },
 *   { "week": "2024-01-08T00:00:00.000Z", "average_bmi": 23.1 }
 * ]
 */

// Import required libraries
const express = require("express");
const knex = require("../knex"); // Ensure this points to our Knex instance

// Example API endpoint for BMI graph data
app.get("/bmi-graph", authenticateToken, async (req, res) => {
  try {
    /**
     * Query the `bmi_history` table to fetch BMI averages grouped by week for the current year.
     * - `DATE_TRUNC('week', recorded_at)`: Groups data by the starting date of each week.
     * - AVG(bmi)`: Calculates the average BMI for each week.
     * - `user_id`: Matches the user ID associated with the authenticated username.
     * - Filters to include only entries recorded in the current year.
     */
    const result = await knex("bmi_history")
      .select(
        knex.raw("DATE_TRUNC('week', recorded_at) AS week"), // Group by week
        knex.raw("AVG(bmi) AS average_bmi") // Calculate weekly average BMI
      )
      .where("user_id", function () {
        // query to find the user ID from the auth username
        this.select("user_id")
          .from("users")
          .where("username", req.user.username); // Match authed user
      })
      .andWhereRaw("EXTRACT(YEAR FROM recorded_at) = EXTRACT(YEAR FROM CURRENT_DATE)") // Filter by current year
      .groupByRaw("DATE_TRUNC('week', recorded_at)") // Group results by week
      .orderByRaw("DATE_TRUNC('week', recorded_at)"); // Sort results 

    // Send the query result as a JSON response
    res.json(result);
  } catch (error) {
    // Log the error to the console for debugging purposes
    console.error("Error fetching BMI data:", error);

    // Send a 500 status code if error occurs
    res.status(500).send("Internal Server Error");
  }
});
