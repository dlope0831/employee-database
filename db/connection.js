const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',

    user: 'root',

    password: 'Kzs14!89erT',
    database: 'management'
  });

  module.exports = db;