'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_history extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //this.belongsTo(models.user_game, {foreignKey: 'user_game_id'})
    }
  }
  user_history.init({
    score: DataTypes.INTEGER,
    login_time: DataTypes.DATE
    // user_game_id:{
    //   type: DataTypes.INTEGER
    // } 
  }, {
    sequelize,
    modelName: 'user_history',
  });
  return user_history;
};