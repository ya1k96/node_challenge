'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here      
      this.belongsToMany(models.character, {through: 'character_movies'}); 
      this.belongsToMany(models.gender, {through: 'movie_gender'});             
    }
  };
  movie.init({
    title: DataTypes.STRING,
    img: DataTypes.STRING,
    rating: DataTypes.INTEGER    
  }, {
    sequelize,
    modelName: 'movie',
  });
  return movie;
};