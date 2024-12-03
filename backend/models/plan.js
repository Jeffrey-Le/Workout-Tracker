const Model = require('./index');

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

module.exports = PlanModel;
