// GET /workouts/search
// This will be integrated into whenever a search is needed
// This endpoint allows users to search for workouts by date, type, or both.
app.get("/workouts/search", authenticateToken, async (req, res) => {
  const { date, type } = req.query;

  // Base query to find workouts for the authenticated user
  let query = "SELECT * FROM workouts WHERE user_id = (SELECT user_id FROM users WHERE username = $1)";
  const params = [req.user.username];

  // Add date condition if not null
  if (date) {
    query += " AND workout_date = $2";
    params.push(date);
  }

  // Add type condition if available
  if (type) {
    query += " AND workout_type ILIKE $3";
    params.push(`%${type}%`);
  }

  try {
    // Execute the query with parameters
    const workouts = await pool.query(query, params);
    res.json(workouts.rows); // Return the matching workouts
  } catch (error) {
    console.error(error); // Log the error for debugging
      res.status(500).send("Internal Server Error");
  }
});
