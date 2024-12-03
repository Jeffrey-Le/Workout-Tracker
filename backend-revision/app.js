const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const { Pool } = require("pg");

const app = express();
const port = 5001;

// PostgreSQL configuration
const pool = new Pool({
	host: "localhost",
	port: 5432,
	user: "35LbsAdmin",
	password: "35LbsA+",
	database: "workoutdb",
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

    await pool.query(
		"INSERT INTO users (username, email, password_hash, age, gender, height) VALUES ($1, $2, $3, $4, $5, $6)",
		[username, email, password, age, gender, height]
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
				"SELECT * FROM users WHERE username = $1 AND password_hash = $2",
				[username, password]
			);
			if (user.rows.length === 0) {
				return res.status(401).send("Invalid credentials.");
			}
			const token = jwt.sign({ user_id: user.rows[0].user_id, username }, jwtSecret, { expiresIn: "1h" });
			res.json({ token });
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
	const { weight, height } = req.body;
	try {
		await pool.query(
			"INSERT INTO bmi_history (user_id, weight, height) VALUES ($1, $2, $3)",
			[req.user.user_id, weight, height]
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
