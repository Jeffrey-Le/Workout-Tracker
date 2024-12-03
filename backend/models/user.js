const Model = require("./index");

// UserModel class will extend Base Model class
// Implement any key functions to interact with users table in database here
class UserModel extends Model {
  static tableName = 'users';
  static primaryKey = 'user_id';

  /**
   * Creates a new user in the database.
   * @param {Object} userData - Contains user credentials related to table.
   * @returns {Promise<Object>} - Returns the newly created user object.
   */
  static async createUser(userData) {
    try {
      const [newUser] = await this.table.insert(userData).returning('*');
      return newUser;
    } catch (error) {
      throw new Error('Error creating new user.');
    }
  }

  /**
   * Finds a user by their email.
   * @param {string} email - Email of the user.
   * @returns {Promise<Object | undefined>} - Returns a single user object or undefined if not found.
   */
  static async findByEmail(email) {
    return await this.table.where('email', email).select('*').first();
  }

  /** 
   * Finds a user by their username.
   * @param {string} username - Username of the user.
   * @returns {Promise<Object | undefined>} - Returns a single user object or undefined if not found.
   */
  static async findByName(username) {
    return await this.table.where('username', username).select('*').first();
  }

  /**
   * Finds a user by their ID.
   * @param {number} id - The user's ID.
   * @returns {Promise<Object | undefined>} - Returns the user object if found, otherwise undefined.
   */
  static async findById(id) {
    return await this.table.where(this.primaryKey, id).select('*').first();
  }

  /**
   * Updates the user's password.
   * @param {number} userID - Unique User ID.
   * @param {string} newPasswordHash - New hashed password for user.
   * @returns {Promise<number>} - A promise that resolves to the number of rows updated (typically 0 or 1).
   */
  static async updatePassword(userID, newPasswordHash) {
    return await this.table.where({ user_id: userID }).update({ password_hash: newPasswordHash });
  }
}

module.exports = UserModel;
