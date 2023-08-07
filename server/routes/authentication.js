const express = require("express");
const cors = require("cors");
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
route.put("/forget_password", authControllers.forgetPassword);

//Get User details
route.get("/get_user/:token", authControllers.getUserDetails)

//Reset Password
route.post(
  "/reset_password",
  [
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
  authControllers.resetPassword
);

module.exports = route;
