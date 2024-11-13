import { Model } from ".";

class PlanModel extends Model {
  static tableName = 'plans';
  static primaryKey = 'plan_id';

  static async createPlan(planData) {
    return await this.table.insert(planData).returning('*');
  }

  static async findByWorkout(workoutID) {
    try {
      return await this.table.where('workout_id', workoutID).select('*');
    }
    catch (error) {
      throw new Error('Error retreiving plans for user.')
    }
  }

  static async deleteByID(workoutID) {
    return await this.deleteByID(workoutID, 'workout_id');
  }

  static async updatePlanName(workoutID, planName) {
    try {
      await this.table.where('workout_id', workoutID).update({plan_name: planName});
      return `Plan with workout ID ${workoutID} updated`;
    }
    catch (error) {
      throw new Error('Error updating plan name.');
    }
  }

}

const PlanModel = {
    id: {
      type: INTEGER,
      serial: true,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
        type: INTEGER,
        FOREIGEN_KEY: true,
        REF: users(users_id),
    },
    email: {
      type: STRING,
      unique: true,
      allowNull: false,
    },
    plan_name: {
        type: STRING,
        allowNull: false,
    },
    created_at: {
        type: DATETIME,
        default: true
    }
  };


// If using sequalize
// module.exports = {
// initialize: (sequelize) => {
//     this.model = sequelize.define("user", UserModel);
// },

// createUser: (user) => {
//     return this.model.create(user);
// }
// };