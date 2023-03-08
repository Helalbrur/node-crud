const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Mobile extends Model {}

Mobile.init({
  name: DataTypes.STRING
}, {
  sequelize,
  modelName: 'mobile'
});

module.exports = Mobile;
