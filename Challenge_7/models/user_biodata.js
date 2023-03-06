'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_biodata extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //this.belongsTo(models.user_game, {foreignKey: 'user_game_id'})
    }
  }
  user_biodata.init({
    name: DataTypes.TEXT,
    email: DataTypes.TEXT,
    mobile: DataTypes.STRING,
    gender: DataTypes.STRING,
    dob: DataTypes.DATE
    // user_game_id:{
    //   type: DataTypes.INTEGER
    // } 
  }, {
    sequelize,
    modelName: 'user_biodata',
  });
  return user_biodata;
};