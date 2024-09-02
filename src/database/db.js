const sqlite = require('sqlite3').verbose();
const path = require('path');

const databaseDir = process.env.DATABASEDIR || path.join(__dirname, 'db.sqlite');
const databasePath = path.resolve(databaseDir);

const db = new sqlite.Database(databasePath, (err) => {
  if (err) {
    console.error('Error opening database', err);
  } else {
    console.log('Database opened');
  }
});

module.exports = db;