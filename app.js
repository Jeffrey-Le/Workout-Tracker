const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/workoutDB")
	.then(() => console.log("Connected to MongoDB"))
	.catch((error) => console.error("Connection error:", error));
	
// Define Schemas
const userSchema = new mongoose.Schema({
	username: String,
	password: String,
	email: String,
});

const workoutSchema = new mongoose.Schema({
	username: String,
	duration: Number,
	distance: Number,
	workoutType: String,
	image: String, // the optional image
	date: { type: Date, default: Date.now },
});

// Define Models
const User = mongoose.model("User", userSchema);
const Workout = mongoose.model("Workout", workoutSchema);

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
const cors = require('cors');
app.use(cors());


// Home route
app.get("/", (req, res) => {
	res.send("Welcome to the Workout Tracker App!");
});

// User registration
app.post("/register", async (req, res) => {
	const { username, password, email } = req.body;

	const userExists = await User.findOne({ $or: [{ username }, { email }] });
	if (userExists) {
		return res.status(409).send("User with this username or email already exists.");
	}

	const user = new User({ username, password, email });
	await user.save();
	res.status(201).send("User registered successfully.");
});

// User login
app.post("/login", async (req, res) => {
	const { username, password } = req.body;
	const user = await User.findOne({ username, password });
	if (!user) {
		return res.status(401).send("Invalid credentials.");
	}
	// return authenticateToken
	const token = jwt.sign({ username }, jwtSecret, { expiresIn: "1h" });
	res.json({ token });
});

// Log workout with authenticateToken
app.post("/workouts", authenticateToken, async (req, res) => {
	const { duration, distance, workoutType, image } = req.body;
	const workout = new Workout({
		username: req.user.username,
		duration,
		distance,
		workoutType,
		image,
	});
	await workout.save();
	res.status(201).send("Workout logged successfully.");
});

// Get user's workouts with authenticateToken
app.get("/workouts", authenticateToken, async (req, res) => {
	const userWorkouts = await Workout.find({ username: req.user.username });
	res.json(userWorkouts);
});

// Search workouts by type with authenticateToken
app.get("/search", authenticateToken, async (req, res) => {
	const { type } = req.query;
	const filteredWorkouts = await Workout.find({
		username: req.user.username,
		workoutType: { $regex: type, $options: "i" },
	});
	res.json(filteredWorkouts);
});

// Start the server
app.listen(port, () => {
	console.log(`Workout Tracker App listening at http://localhost:${port}`);
});