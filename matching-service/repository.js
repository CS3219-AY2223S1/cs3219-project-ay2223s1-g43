const { Sequelize, DataTypes } = require('sequelize');
const getMatchModel = require('./model/match');
const getPendingMatchModel = require('./model/pending-match');
require('dotenv').config();

const { PG_DB_NAME, PG_USER, PG_PASSWORD, PG_HOST } = process.env

const sequelize = new Sequelize(PG_DB_NAME, PG_USER, PG_PASSWORD, {
  host: PG_HOST,
  dialect: 'postgres'
})

export { sequelize, DataTypes }