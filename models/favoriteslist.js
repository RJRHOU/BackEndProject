'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class favoritesLIST extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  favoritesLIST.init({
    name: DataTypes.STRING,
    slug: DataTypes.STRING,
    background_image: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    released: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'favoritesLIST',
  });
  return favoritesLIST;
};