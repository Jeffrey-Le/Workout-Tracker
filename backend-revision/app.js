const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const { Pool } = require("pg");
const bcrypt = require('bcrypt');

require('dotenv').config(); // Load environment variables

const app = express();
const port = 5001;

// PostgreSQL configuration
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || '35LbsAdmin',
  password: process.env.DB_PASSWORD || '35LbsA+',
  database: process.env.DB_NAME || 'workoutdb'
});

// Middleware
app.use(bodyParser.json());
const jwtSecret = "supersecretkey";

// Helper function to authenticate user with JWT
function authenticateToken(req, res, next) {
	const token = req.headers["authorization"];

	if (!token) return res.sendStatus(401);

	jwt.verify(token, jwtSecret, (err, user) => {
	if (err) return res.sendStatus(403);
		req.user = user;
		next();
	});
}
  //Verifies a password against a hashed password
  async function verifyPassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }

  //Hashes a user's password
  async function hashPassword(password) {
      const salt = await bcrypt.genSalt(10);  // Generates a salt
      return await bcrypt.hash(password, salt);  // Hashes the password with the salt
  }

// Routes
const cors = require("cors");
app.use(cors());

// Home route
app.get("/", (req, res) => {
	res.send("Welcome to the Workout Tracker App!");
});

// User registration
app.post("/register", async (req, res) => {
	const { username, email, password, age, gender, height } = req.body;
	try {
    const userExists = await pool.query(
		"SELECT * FROM users WHERE username = $1 OR email = $2",
		[username, email]
    );
    if (userExists.rows.length > 0) {
		return res.status(409).send("User with this username or email already exists.");
    }

    const hashedPassword = await hashPassword(password); // Hash User's Password

    await pool.query(
		"INSERT INTO users (username, email, password_hash, age, gender, height) VALUES ($1, $2, $3, $4, $5, $6)",
		[username, email, hashedPassword, age, gender, height]
    );
    res.status(201).send("User registered successfully.");
	} catch (error) {
		console.error(error);
		res.status(500).send("Internal server error.");
	}
});

// User login
app.post("/login", async (req, res) => {
	const { username, password } = req.body;
		try {
			const user = await pool.query(
				"SELECT * FROM users WHERE username = $1",
				[username]
			);
			if (user.rows.length === 0) {
				return res.status(401).send("Invalid credentials.");
			}

      if (verifyPassword(password, user.rows[0].password_hash)) {
        const token = jwt.sign({ user_id: user.rows[0].user_id, username }, jwtSecret, { expiresIn: "1h" });
        res.json({ token });
      }
		} catch (error) {
		console.error(error);
		res.status(500).send("Internal server error.");
	}
});

// Log workout
app.post("/workouts", authenticateToken, async (req, res) => {
  const { workoutType, duration, distance, calories, notes } = req.body;

  try {
    // Ensure notes is either null or a string, and pass an empty JSON object if no details are provided
    const details = notes ? JSON.stringify({ notes }) : '{}';

    // Insert the workout data into the database
    await pool.query(
      "INSERT INTO workouts (user_id, workout_type, duration, distance, calories, details) VALUES ($1, $2, $3, $4, $5, $6)",
      [req.user.user_id, workoutType, duration, distance, calories, details]
    );
    res.status(201).send("Workout logged successfully.");
  } catch (error) {
    console.error("Error logging workout:", error);
    res.status(500).send("Internal server error.");
  }
});

// Get user's workouts
app.get("/workouts", authenticateToken, async (req, res) => {
	try {
		const userWorkouts = await pool.query(
			"SELECT * FROM workouts WHERE user_id = $1 ORDER BY created_at DESC",
			[req.user.user_id]
		);
		res.json(userWorkouts.rows);
	} catch (error) {
		console.error(error);
		res.status(500).send("Internal server error.");
	}
});

// Search workouts by type and date
app.get("/workouts/search", authenticateToken, async (req, res) => {
    const { type, date } = req.query;
    try {
        // Base query and parameters array
        let query = "SELECT * FROM workouts WHERE user_id = $1";
        const params = [req.user.user_id];
		
        // Add type filter if provided
        if (type) {
            params.push(`%${type}%`);
            query += ` AND workout_type ILIKE $${params.length}`;
        }

        // Add date filter if provided
        if (date) {
            params.push(date);
            query += ` AND workout_date = $${params.length}`;
        }

        // Execute the query with the constructed parameters
        const filteredWorkouts = await pool.query(query, params);
        res.json(filteredWorkouts.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error.");
    }
});

// Log BMI
app.post("/bmi", authenticateToken, async (req, res) => {
	const { weight, height, month } = req.body;
	try {
		await pool.query(
			"INSERT INTO bmi_history (user_id, weight, height, recorded_at) VALUES ($1, $2, $3, NOW() + ($4 - EXTRACT(MONTH FROM NOW())) * INTERVAL '1 month')",
			[req.user.user_id, weight, height, month]
		);
		res.status(201).send("BMI recorded successfully.");
	} catch (error) {
		console.error(error);
		res.status(500).send("Internal server error.");
	}
});

// Get BMI history
app.get("/bmi", authenticateToken, async (req, res) => {
	try {
		const bmiHistory = await pool.query(
			"SELECT * FROM bmi_history WHERE user_id = $1 ORDER BY recorded_at DESC",
			[req.user.user_id]
		);
		res.json(bmiHistory.rows);
	} catch (error) {
		console.error(error);
		res.status(500).send("Internal server error.");
	}
});

app.get("/bmi/graph", authenticateToken, async (req, res) => {
  const { max_years = 12 } = req.query; // max_years defaults to 12 if no number is provided

  try {
      // Fetch available years that have an entry
      const yearQuery = await pool.query(
        "SELECT DISTINCT EXTRACT(YEAR FROM recorded_at)::int AS year FROM bmi_history ORDER BY year DESC LIMIT $1",
        [max_years]
      )

      const availableYears = yearQuery.rows;

      const bmiDataByYear = {};

      // Process data for each year
      for (const row of availableYears) {
          // Fetch BMI averages for the current year
          const query = await pool.query(
            `SELECT EXTRACT(MONTH FROM recorded_at)::int AS month,
            AVG(bmi) AS average_bmi
            FROM bmi_history
            WHERE user_id = $1
            AND EXTRACT(YEAR FROM recorded_at) = $2
            GROUP BY EXTRACT(MONTH FROM recorded_at)
            ORDER BY EXTRACT(MONTH FROM recorded_at);
            `,
            [req.user.user_id, row.year]
          )

          const averages = query.rows;

          // Create an array of size 12, initialized to null for missing months
          const monthlyAverages = Array(12).fill(null);
          averages.forEach(({ month, average_bmi }) => {
              monthlyAverages[month - 1] = average_bmi / 10; // Correct month index is month - 1
          });

          // Add the data for the current year to the response object
          bmiDataByYear[row.year] = monthlyAverages;
      }

      res.status(200).json(bmiDataByYear);
  } catch (error) {
      console.error('Error fetching BMI data:', error);
      res.status(500).send('Internal Server Error');
  }
});

// Get user profile
app.get("/profile", authenticateToken, async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT username, email, age, gender, height FROM users WHERE user_id = $1",
      [req.user.user_id]
    );
    if (user.rows.length === 0) {
      return res.status(404).send("User not found.");
    }
    res.json(user.rows[0]);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).send("Internal server error.");
  }
});

// Update user profile
app.put("/profile", authenticateToken, async (req, res) => {
  const { username, email, age, gender, height } = req.body;
  try {
    await pool.query(
      "UPDATE users SET username = $1, email = $2, age = $3, gender = $4, height = $5 WHERE user_id = $6",
      [username, email, age, gender, height, req.user.user_id]
    );
    res.status(200).send("Profile updated successfully.");
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).send("Internal server error.");
  }
});

// Start the server
app.listen(port, () => {
	console.log(`Workout Tracker App listening at http://localhost:${port}`);
});