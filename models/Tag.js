const { Model, DataTypes } = require('sequelize'); //Require models

const sequelize = require('../config/connection.js'); //Require sequelize

class Tag extends Model {}

Tag.init( //Defining columns
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    tag_name: {
      type: DataTypes.STRING,
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'tag',
  }
);

module.exports = Tag; //Exporting tag