const userModel = require('../models/userModel.js');
const bcrypt = require('bcrypt');

const signup = (req, res) => {
  userModel.createUser(req.body, (err, result) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json({
      "message": "success",
      "data": { id: result.id, name: req.body.name, email: req.body.email }
    });
  });
};

const login = (req, res) => {
  const { email, password } = req.body;
  userModel.findUserByEmail(email, (err, user) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    if (!user) {
      res.status(404).json({ "error": "User not found" });
      return;
    }
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        res.status(500).json({ "error": "Internal server error" });
        return;
      }
      if (!result) {
        res.status(401).json({ "error": "Invalid password" });
        return;
      }
      res.json({ "message": "success", "data": { id: user.id, name: user.name, email: user.email } });
    });
  });
};

module.exports = {
  signup,
  login
};
