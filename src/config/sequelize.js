const { database } = require("./index");
const { name, username, password, host } = database;
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(name, username, password, {
  host: host,
  dialect: "mysql",
});
module.exports = sequelize;
