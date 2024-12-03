const express = require("express");
const router = express.Router();

const UserController = require("../controllers/userController");
const authenticeToken = require("../middleware/authMiddleware");

router.post("/login", UserController.login);
router.post("/register", UserController.register);
router.get("/", authenticeToken, UserController.getUser);

module.exports = router;