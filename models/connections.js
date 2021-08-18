const mysql = require('mysql2/promise');

require('dotenv').config();

const { 
  ADHARA_SERVER,
  ADHARA_USER,
  ADHARA_PASSWORD,
  ADHARA_PORT } = process.env;

const DATABASE = 'Test_Adhara'

const connection = mysql.createPool({
  host: ADHARA_SERVER,
  user: ADHARA_USER,
  password: ADHARA_PASSWORD,
  database: DATABASE,
  port: ADHARA_PORT,
});

module.exports = connection;