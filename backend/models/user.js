const Model = require("./index");

// UserModel class will extend Base Model class
// Implement any key functions to interact with users table in database here
class UserModel extends Model {
  static tableName = 'users';
  static primaryKey = 'user_id';

  /**
  * @param {Object} userData - Contains user credentials related to table
  * @returns {Promise<User[]>} - Returns an object list of users and data relating to them
  */
  static async createUser(userData) {
    try {
      return this.table.insert(userData).returning('*');
    }
    catch (error) {
      throw new Error('Error creating new user.')
    }
  }

  /**
  * @param {string} email - Email for user
  * @returns {Promise<Object | undefined>} - Returns a single object of a user
  */
  static async findByEmail(email) {
    return await this.table.where('email', email).select('*').first();

  }

  /** 
  * @param {string} username - Username for user
  * @returns {Promise<Object | undefined>} - Returns a single object of a user
  */
  static async findByName(username) {
    return await this.table.where('username', username).select('*').first();

  }

  /**
  * @param {integer} userID - Unique User ID
  * @param {string} newPassword - New hashed password for user
  * @returns {Promise<number>} - A promise that resolves to the number of rows updated (typically 0 or 1)
  */
  static async updatePassword(userID, newPassword) {
    return await this.table.where({id: userID}).update({password: newPassword});
  }
}

module.exports = UserModel;