const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/Users");

exports.registration = (req, res, next) => {
  let name = req.body.name;
  let email = req.body.email;
  let password = req.body.password;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let error = new Error("Invalid User Input");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  bcrypt
    .hash(password, 12)
    .then((hashedPassword) => {
      const user = new User();
      user.name = name;
      user.email = email;
      user.password = hashedPassword;
      return user.save();
    })
    .then((userDoc) => {
      res.status(201).json({
        message: "User successfully added",
        userId: userDoc._id.toString(),
      });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};

exports.login = (req, res, next) => {
  let email = req.body.email;
  let password = req.body.password;
  let user;

  User.findOne({ email: email })
    .then((userDoc) => {
      if (!userDoc) {
        let error = new Error("Email does not exist");
        error.statusCode = 404;
        throw error;
      }
      user = userDoc;
      return bcrypt.compare(password, userDoc.password);
    })
    .then((validatedUser) => {
      if (!validatedUser) {
        let error = new Error("Bad Authentication");
        error.statusCode = 401;
        throw error;
      }
      return jwt.sign({ userId: user._id.toString() }, process.env.PRIVATEKEY, {
        expiresIn: "7d",
      });
    })
    .then((results) => {
      res.status(200).json({ message: "User authenticated successfully" });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};
