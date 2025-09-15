const userModel = require('../models/userModel.js');

const getAllUsers = (req, res) => {
  userModel.getAllUsers((err, rows) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json({
      "message": "success",
      "data": rows
    });
  });
};

const getUserById = (req, res) => {
  userModel.getUserById(req.params.id, (err, row) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json({
      "message": "success",
      "data": row
    });
  });
};

const createUser = (req, res) => {
  userModel.createUser(req.body, (err, result) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json({
      "message": "success",
      "data": { ...req.body, id: result.id }
    });
  });
};

const updateUser = (req, res) => {
  userModel.updateUser(req.params.id, req.body, (err, result) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json({ message: "success", changes: result.changes });
  });
};

const deleteUser = (req, res) => {
  userModel.deleteUser(req.params.id, (err, result) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json({ "message": "deleted", changes: result.changes });
  });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
