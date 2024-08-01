let {DataTypes, sequelize} = require('../lib/');

let employee = sequelize.define('employee', {
  name: DataTypes.TEXT,
  designation: DataTypes.TEXT,
  department: DataTypes.TEXT,
  salary: DataTypes.NUMBER
});

module.exports = {
  employee
};