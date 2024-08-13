let sq = require('sequelize');

let sequelize = new sq.Sequelize({
  dialect: 'sqlite',
  storage: './BD_5.6_A2/database.sqlite'
});

module.exports = {DataTypes: sq.DataTypes, sequelize}