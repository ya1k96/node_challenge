'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class character extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.movie, {through: 'character_movies'});              
    }
  };
  character.init({
    img: DataTypes.STRING,
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    weight: DataTypes.INTEGER,
    history: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'character',
  });
  return character;
};