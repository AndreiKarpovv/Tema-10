'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

// Добавление модели VirtualTour
// const VirtualTour = require('./virtualtour')(sequelize, Sequelize.DataTypes);
// db['virtualtour'] = VirtualTour;

// Чтение и загрузка остальных моделей
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Применение ассоциаций, если они есть
Object.values(db).forEach(model => {
  if (model.associate) {
    model.associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
