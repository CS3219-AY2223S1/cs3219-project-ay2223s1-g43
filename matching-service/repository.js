require('dotenv').config();

const { Sequelize, DataTypes } = require('sequelize');

const { PG_DB_NAME, PG_USER, PG_PASSWORD, PG_HOST } = process.env

exports.sequelize = new Sequelize(PG_DB_NAME, PG_USER, PG_PASSWORD, {
  host: PG_HOST,
  dialect: 'postgres'
})

exports.DataTypes = DataTypes;

// module.exports = { sequelize, DataTypes }