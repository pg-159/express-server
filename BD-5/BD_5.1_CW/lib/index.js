let sq = require('sequelize');
let sequelize = new sq.Sequelize({
  dialect: 'sqlite',
  storage: './BD_5.1_CW/database.sqlite',
});

module.exports = {DataTypes: sq.DataTypes, sequelize};