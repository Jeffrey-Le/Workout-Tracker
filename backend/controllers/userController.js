const { hash } = require("bcrypt");
const UserModel = require("../models/user");
const authService = require("../services/authService");
const jwt = require("jsonwebtoken");
const jwtSecret = "supersecretkey";

/** 
* Controller class to implement Buisness logic for User => Any logic a user can do goes here
*/

class UserController {
  /** 
  * Registers a new account for the user.
  * @param {Promise<Object>} req - The request header; Will contain information involving registration credentials
  * @param {Promise<Object>} res - The response header; Will allow information to be sent to client 
  * @returns {Promise<void>} - Returns once registration process completes and response is sent
  */
  static async register(req, res) {
    try {
      const userData = req.body;
      
      // Validation of Fields
      if (!userData.email || !userData.password || !userData.username) {
      return res.status(400).json({ error: 'All fields are required.' });
      }

      // Check if email is taken
      const existingUser = await UserModel.findByEmail(userData.email);

      if (existingUser)
        return res.status(409).json({ error: 'Email already in use.' });

      // Create new User
      const hashedPassword = await authService.hashPassword(userData.password); // Hash User's Password

      userData.password_hash = hashedPassword;
      delete userData.password;

      const newUser = await UserModel.createUser(userData);

      return res.status(200).json(newUser);
    }
    catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  /** 
  * Logs the user in and checks credentials
  * @param {Object} req - The request header; Will contain information involving login credentials
  * @param {Object} res - The response header; Will allow information to be sent to client 
  * @returns {Promise<void>} - Resolves once login process completes and response is sent (JWT token returned)
  */
  static async login(req, res) {
    const userData = req.body;

    try {
      const user = await UserModel.findByName(userData.username);

      // User doesn't exist
      if (!user)
        return res.status(401).json({ error: "User doesn't exist" });

      // Verify Password
      if (authService.verifyPassword(userData.password, user.password_hash)) {
        // Return JWT Token here and user credentials if need be
        const token = jwt.sign({ user_id: user.user_id, username: user.username }, jwtSecret, { expiresIn: "1h" });
        return res.status(200).json({ token });
        //return res.status(200).json({message: "Login Successful", user });
      }
      else
        return res.status(400).json({message: "Invalid credentials"});

    
    }
    catch (err) {
      return res.status(500).json({error: err.message });
    }
  }

  /** 
  * Get user by ID
  * @param {Promise<Object>} req - The request header; Will contain information involving registration credentials
  * @param {Promise<Object>} res - The response header; Will allow information to be sent to client 
  * @returns {Promise<Object>} - Returns user object data if user with <id> is found
  */
  static async getUser(req, res) {
    const { id } = req.params;
    try {
        const user = await UserModel.findByID(id);
        if (user)
            res.status(200).json(user);
        else
            res.status(404).json({ message: 'User not found' });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
  }

  /** 
  * Delete user by ID
  * @param {Promise<Object>} req - The request header; Will contain information involving registration credentials
  * @param {Promise<Object>} res - The response header; Will allow information to be sent to client 
  * @returns {Promise<Object>} - Returns user object data if user with <id> is found and deleted
  */
  static async deleteUser(req, res) {
    const { id } = req.params;
    try {
      const user = await UserModel.deleteByID(id);

      if (user)
        res.status(200).json(user);
    else
        res.status(404).json({ message: 'User cannot be deleted' });
    }
    catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

}

module.exports = UserController;