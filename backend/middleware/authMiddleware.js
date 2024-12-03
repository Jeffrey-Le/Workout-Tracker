const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET || "supersecretkey";

// Helper function to authenticate user with JWT

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided or malformed header." });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token missing." });
  }

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) {
      return res.status(401).json({ error: "Invalid or expired token." });
    }

    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
