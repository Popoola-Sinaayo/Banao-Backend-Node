const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const createUser = (req, res, next) => {
  const { username, password } = req.body;
  console.log(username, password);
  console.log(req.body);
  User.findOne({ username: username }).then((user) => {
    if (user) {
      return res.json("Username already exists");
    } else {
      bcrypt.hash(password, 10).then((result) => {
        if (!result) {
          return res.json("An error occured");
        }
        user = new User({ username: username, password: result });
        user.save();
        return res.json("User Created successfully");
      });
    }
  });
};

const loginUser = (req, res, next) => {
  const { username, password } = req.body;
  User.findOne({ username: username }).then((user) => {
    if (!user) {
      return res.json("Username and password error");
    } else {
      bcrypt.compare(password, user.password).then((match) => {
        if (match) {
          return res.json("Login Successful");
        } else {
          return res.json("Login Error");
        }
      });
    }
  });
};

const forgotPassword = (req, res, next) => {
  const { username, password } = req.body;
  console.log(username, password);
  console.log(req.body);
  User.findOne({ username: username }).then((user) => {
    if (!user) {
      return res.json("Username does not exist");
    } else {
      bcrypt.hash(password, 10).then((result) => {
        if (!result) {
          return res.json("An error occured");
        } else {
          User.updateOne({ username: username }, { password: result }).then(result => {
            console.log(result)
            return res.json("Password Change Successful");
          })
        }
      });
    }
  });
};
module.exports = { createUser, loginUser, forgotPassword };
