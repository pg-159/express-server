let sq = require('sequelize');
let sequelize = new sq.Sequelize({
  dialect: 'sqlite',
  storage: './BD_5.1_HW_1/database.sqlite'
});

module.exports = {DataTypes: sq.DataTypes, sequelize};