const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, '../users.db');

// Connect to SQLite database
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the SQLite database.');
    db.serialize(() => {
      // Create the users table if it doesn't exist
      const createTableSql = `
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          email TEXT NOT NULL UNIQUE,
          password TEXT NOT NULL
        )
      `;
      db.run(createTableSql, (err) => {
        if (err) {
          console.error(err.message);
        }
      });

      // Add the password column if it doesn't exist
      const alterTableSql = `
        ALTER TABLE users ADD COLUMN password TEXT NOT NULL DEFAULT ''
      `;
      db.run(alterTableSql, (err) => {
        if (err && !err.message.includes('duplicate column name')) {
          console.error(err.message);
        }
      });
    });
  }
});

module.exports = db;