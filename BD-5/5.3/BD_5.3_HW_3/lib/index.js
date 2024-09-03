let sq = require('sequelize');
let sequelize = new sq.Sequelize({
  dialect: 'sqlite',
  storage: './BD_5.3_HW_3/database.sqlite'
});

module.exports = {DataTypes: sq.DataTypes, sequelize};