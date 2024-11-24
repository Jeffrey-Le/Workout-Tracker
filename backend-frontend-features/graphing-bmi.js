/**
 * Feature: BMI Graph Integration
 * Description:
 *  - Provides a backend API endpoint to fetch weekly BMI averages for the current year.
 *  - Uses PostgreSQL to calculate weekly BMI data from the `bmi_history` table.
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

// Example API endpoint for BMI graph data
app.get("/bmi-graph", authenticateToken, async (req, res) => {
  try {
    const query = `
      SELECT
        DATE_TRUNC('week', recorded_at) AS week,
        AVG(bmi) AS average_bmi
      FROM bmi_history
      WHERE user_id = (SELECT user_id FROM users WHERE username = $1)
        AND EXTRACT(YEAR FROM recorded_at) = EXTRACT(YEAR FROM CURRENT_DATE)
      GROUP BY week
      ORDER BY week;
    `;
    const result = await pool.query(query, [req.user.username]);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching BMI data:", error);
    res.status(500).send("Internal Server Error");
  }
});
