const bcrypt = require('bcrypt');

class AuthService {
    /**
     * Verifies a password against a hashed password
     * @param {string} password - The password to verify
     * @param {string} hashedPassword - The hashed password to compare against
     * @returns {boolean} - Returns TRUE if passwords match, FALSE otherwise
     */
    async verifyPassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
    }

    /**
     * Hashes a user's password
     * @param {string} password - The password to hash
     * @returns {Promise<string>} - Returns the hashed password
     */
    async hashPassword(password) {
        const salt = await bcrypt.genSalt(10);  // Generates a salt
        return await bcrypt.hash(password, salt);  // Hashes the password with the salt
    }

}

module.exports = new AuthService();
