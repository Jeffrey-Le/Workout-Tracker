const express = require("express");
const router = express.Router();

const UserController = require("../controllers/userController");
const authenticateToken = require("../middleware/authMiddleware"); // Corrected variable name

// Routes that do not require authentication
router.post("/login", UserController.login);
router.post("/register", UserController.register);

// Apply authentication middleware to routes below
router.use(authenticateToken);

// Routes that require authentication
router.get("/", UserController.getUser);
router.get('/profile', UserController.getUserProfile);

module.exports = router;
