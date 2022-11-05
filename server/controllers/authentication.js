const { validationResult } = require("express-validator");
const bycrypt = require("bcryptjs");
const User = require("../models/Users");

exports.registration = (req, res, next) => {
  let email = req.body.email;
  let password = req.body.password;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let error = new Error("Invalid User Input");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  bycrypt
    .hash(password, 12)
    .then((hashedPassword) => {
      const user = new User();
      user.email = email;
      user.password = hashedPassword;
      return user.save();
    })
    .then((userDoc) => {
      res
        .status(201)
        .json({
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
