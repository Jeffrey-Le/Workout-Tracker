
const jwt = require("jsonwebtoken");
const jwtSecret = "supersecretkey";

// Helper function to authenticate user with JWT

function authenticateToken(req, res, next) {
    const token = req.headers["authorization"];

    console.log(token);
    if (!token) return res.sendStatus(401);

    const tokenWithoutBearer = token.split(" ")[1];

    if (!tokenWithoutBearer) return res.sendStatus(403);
  
    jwt.verify(tokenWithoutBearer, jwtSecret, (err, user) => {
    console.log("Decoded user:", user); // Log the decoded user data
      if (err) return res.sendStatus(403);
      
      req.user = user;
      next();
    });
  }

  module.exports = authenticateToken;