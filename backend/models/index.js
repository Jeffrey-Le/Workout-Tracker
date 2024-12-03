const db = require("../config/db")

class Model {
    static tableName; // static keyword makes this variable guarenteed to be shared in all classses of this instance
    static primaryKey; // static keyword makes this variable guarenteed to be shared in all classses of this instance

    constructor() {
        // Create a condition to make Model an abstract class. A base class for other Model Classes
        // Abstract class = A class that cannot be used alone, i.e. must be ineherited by another class
        // WILL CONTAIN GENERAL QUERIES ALL MODELS WILL CONTAIN
        if (new.target === Model) {
          throw new Error("Cannot instantiate abstract class Model directly.");
        }
    }

    // In general the get keyword makes table a getter function
    // This means when you call Model.table, it will run the table() function here
    // Model.table === Model.table()
    static get table() {
        if (!this.tableName) {
            throw new Error('The table name must be defined for the model.');
        }
        return db(this.tableName);
    }

    // General function to insert data into database
    // Typically POST requests
    static async insert(data) {
        try {
            const [result] = await this.table.insert(data).returning(this.primaryKey);
            return result;
        }
        catch (error) {
            throw new Error("Error, data could not be inserted");
        }
    }

    // General function to update data into database
    static async updateByID(id, data) {
        try {
            await this.table.where(this.primaryKey, id).update(data);
            return `${this.primaryKey.slice(0, -3)} ${id} updated successfully.`;
        } catch (error) {
            throw new Error(`Error updating ${this.primaryKey.slice(0, -3)} data.`);
        }
    }

     // Method to delete a entry by ID
     static async deleteByID(id) {
        try {
            await this.table.where(this.primaryKey, id).del();
            return `{this.primaryKey.slice(0, -3)} ${id} deleted successfully.`;
        } catch (error) {
            throw new Error(`Error deleting ${this.primaryKey.slice(0, -3)}.`);
        }
    }
    
    // Fetches data for an entry with matching id
    static async findOneById(id) {
        try {
            return await this.table.where(this.primaryKey, id).select("*").first();
        }
        catch (error) {
            throw new Error(`Could not find data with id ${id}`);
        }
    }
    
    // Fetehes all data for the table/model
    // Rejection or error should never run realistically
    static async findAll() {
        try {
            return await this.table.select('*');
        }
        catch (error) {
            throw new Error("Could not retreive all data");
        }
    }

    /**
     * @param {Object} userData - Contains user credentials related to table
     * @returns {Promise<Object | undefined>} - Returns an object list of data for the user
     */
    static async findByUser(userID) {
        try {
            return await this.table.where('user_id', userID).select('*');
        }
        catch (error) {
            throw new Error(`Error retreiving ${this.primaryKey.slice(0, -3)} for user.`);
        }
    }

}

module.exports = Model;