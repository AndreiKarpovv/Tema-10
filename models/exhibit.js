'use strict';

module.exports = (sequelize, DataTypes) => {
  const Exhibit = sequelize.define('Exhibit', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true
    },
    yearCreated: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {});



  return Exhibit;
};
