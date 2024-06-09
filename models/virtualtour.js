'use strict';

module.exports = (sequelize, DataTypes) => {
  const VirtualTour = sequelize.define('VirtualTour', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    photo1: {
      type: DataTypes.STRING,
      allowNull: true
    },
    photo2: {
      type: DataTypes.STRING,
      allowNull: true
    },
    video1: {
      type: DataTypes.STRING,
      allowNull: true
    },
    audio1: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });

  return VirtualTour;
};
