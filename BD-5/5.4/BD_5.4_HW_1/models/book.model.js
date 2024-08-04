let {DataTypes, sequelize} = require('../lib/');

let book = sequelize.define('book', {
  title: DataTypes.STRING,
  genre: DataTypes.TEXT,
  publication: DataTypes.INTEGER
})

module.exports = {book};