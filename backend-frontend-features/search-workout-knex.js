/**
 * Feature: Search Workouts (Knex.js version)
 * Description:
 *  - this is a backend API endpoint to search for workouts by date, type, or both.
 *  - Uses Knex.js for building the query dynamically based on the search parameters.
 * Instructions:
 * 1. Integrate this endpoint into the frontend to allow users to search their workout logs.
 *
 * Example API Request:
 *  - `/workouts/search?date=2024-11-24&type=Run`
 *
 * Example API Response:
 * [
 *   {
 *     "workout_id": 1,
 *     "user_id": 123,
 *     "workout_type": "Run",
 *     "duration": 45,
 *     "distance": 5.2,
 *     "sets": 3,
 *     "reps": 12,
 *     "weight_used": 50,
 *     "workout_date": "2024-11-24",
 *     "created_at": "2024-11-24T10:00:00.000Z"
 *   }
 * ]
 */
// Here are the libraries
const express = require("express");
const knex = require("../knex"); // Ensure this points to our knex

/**
 * GET /workouts/search - Search for workouts
 * Description:
 *  - Allows users to search for workouts by date, type, or both.
 * Query Parameters:
 *  - `date` (optional): The date of the workout in `YYYY-MM-DD` format.
 *  - `type` (optional): The workout type (e.g., "Run", "Cycling").
 */
app.get("/workouts/search", authenticateToken, async (req, res) => {
  const { date, type } = req.query; // Extract query parameters

  try {
    // Build the base query to find workouts for the authenticated user
    const query = knex("workouts")
      .select("*")
      .where("user_id", function () {
        this.select("user_id")
          .from("users")
          .where("username", req.user.username);
      });

    // Add a date filter if the `date` parameter is provided
    if (date) {
      query.andWhere("workout_date", date);
    }

    // Add a workout type filter if the `type` parameter is provided
    if (type) {
      query.andWhere("workout_type", "ILIKE", `%${type}%`); 
    }

    const workouts = await query;

    res.json(workouts);
  } catch (error) {

    console.error("Error searching workouts:", error);

    res.status(500).send("Internal Server Error");
  }
});
