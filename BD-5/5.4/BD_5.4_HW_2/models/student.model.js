let { DataTypes, sequelize } = require("../lib/");

let student = sequelize.define("student", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = { student };
