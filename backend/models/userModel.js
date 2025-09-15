const db = require('../config/database.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const getAllUsers = (callback) => {
  const sql = "SELECT id, name, email FROM users";
  db.all(sql, [], (err, rows) => {
    callback(err, rows);
  });
};

const getUserById = (id, callback) => {
  const sql = "SELECT id, name, email FROM users WHERE id = ?";
  db.get(sql, [id], (err, row) => {
    callback(err, row);
  });
};

const findUserByEmail = (email, callback) => {
  const sql = "SELECT * FROM users WHERE email = ?";
  db.get(sql, [email], (err, row) => {
    callback(err, row);
  });
};

const createUser = (user, callback) => {
  const { name, email, password } = user;
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      return callback(err);
    }
    const sql = 'INSERT INTO users (name, email, password) VALUES (?,?,?)';
    db.run(sql, [name, email, hash], function(err) {
      callback(err, { id: this.lastID });
    });
  });
};

const updateUser = (id, user, callback) => {
  const { name, email, password } = user;
  if (password) {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        return callback(err);
      }
      const sql = `UPDATE users set 
               name = COALESCE(?,name), 
               email = COALESCE(?,email),
               password = COALESCE(?,password)
               WHERE id = ?`;
      db.run(sql, [name, email, hash, id], function(err) {
        callback(err, { changes: this.changes });
      });
    });
  } else {
    const sql = `UPDATE users set 
             name = COALESCE(?,name), 
             email = COALESCE(?,email) 
             WHERE id = ?`;
    db.run(sql, [name, email, id], function(err) {
      callback(err, { changes: this.changes });
    });
  }
};

const deleteUser = (id, callback) => {
  const sql = 'DELETE FROM users WHERE id = ?';
  db.run(sql, [id], function(err) {
    callback(err, { changes: this.changes });
  });
};

module.exports = {
  getAllUsers,
  getUserById,
  findUserByEmail,
  createUser,
  updateUser,
  deleteUser
};