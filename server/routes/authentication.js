const express = require("express");
const { body } = require("express-validator");
const User = require("../models/Users");
const authControllers = require("../controllers/authentication");

const route = express.Router();

//Registration
route.post(
  "/register",
  [
    body("name")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Name can not be empty")
      .isLength({ min: 4 })
      .withMessage("Name must be at least 4 characters long"),
    body("email")
      .trim()
      .isEmail()
      .withMessage("Please provide a valid email")
      .not()
      .isEmpty()
      .withMessage("Email can not be empty")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("Email already exist");
          }
        });
      })
      .normalizeEmail(),
    body("password")
      .not()
      .isEmpty()
      .withMessage("Password can not be empty")
      .isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        returnScore: false,
      })
      .withMessage(
        "Password must contain at least 8 characters, 1 lowercase, 1 uppercase, 1 number and 1 special character."
      ),
  ],
  authControllers.registration
);

//Login
route.put("/login", authControllers.login);

//Forget Password
route.put("/reset_password", authControllers.forgetPassword)

module.exports = route;
