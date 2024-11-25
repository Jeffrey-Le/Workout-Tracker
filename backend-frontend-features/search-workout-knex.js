/**
 * Feature: Search Workouts with Flexible Date and Type Filtering (Knex.js)
 * Description:
 *  - Allows users to search for workouts based on:
 *    a. Specific date or partial date (day, month, year).
 *    b. Workout type (case-insensitive match).
 *    c. Both conditions combined.
 * Example API Request:
 *  - `/workouts/search?date=2024-11-24&type=Run`
 *  - `/workouts/search?date=2024-11&type=Run`
 * Example API Response:
 * [
 *   {
 *     "workout_id": 1,
 *     "user_id": 123,
 *     "workout_type": "Run",
 *     "duration": 45,
 *     "distance": 5.2,
 *     "workout_date": "2024-11-24",
 *     "details": null,
 *     "created_at": "2024-11-24T10:00:00.000Z"
 *   }
 * ]
 */

const express = require("express");
const knex = require("../knex"); // Reference to our Knex instance

/**
 * GET /workouts/search - Search for workouts
 * Query Parameters:
 *  - `date` (optional): Filter workouts by date (full date, year, month, or day).
 *  - `type` (optional): Filter workouts by workout type (e.g., "Run").
 */
app.get("/workouts/search", authenticateToken, async (req, res) => {
  const { date, type } = req.query; // Extract query parameters

  try {
    // Base query to filter workouts for the authenticated user
    const query = knex("workouts")
      .select("*")
      .where("user_id", function () {
        this.select("user_id")
          .from("users")
          .where("username", req.user.username);
      });

    // Add date condition based on the format of the `date` parameter
    if (date) {
      if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        // Full date (YYYY-MM-DD)
        query.andWhere("workout_date", date);
      } else if (/^\d{4}-\d{2}$/.test(date)) {
        // Year and month (YYYY-MM)
        query.andWhereRaw("TO_CHAR(workout_date, 'YYYY-MM') = ?", [date]);
      } else if (/^\d{4}$/.test(date)) {
        // Year only (YYYY)
        query.andWhereRaw("EXTRACT(YEAR FROM workout_date) = ?", [parseInt(date)]);
      } else {
        return res.status(400).send("Invalid date format.");
      }
    }

    // Add workout type condition if `type` parameter is provided
    if (type) {
      query.andWhere("workout_type", "ILIKE", `%${type}%`); // Case-insensitive search
    }

    // Execute the query and fetch results
    const workouts = await query;

    res.json(workouts);
  } catch (error) {
    console.error("Error searching workouts:", error);
    res.status(500).send("Internal Server Error");
  }
});
