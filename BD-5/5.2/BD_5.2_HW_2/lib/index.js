let sq = require('sequelize');
let sequelize = new sq.Sequelize({
  dialect: 'sqlite',
  storage: './BD_5.2_HW_2/database.sqlite'
});

module.exports = {DataTypes: sq.DataTypes, sequelize};