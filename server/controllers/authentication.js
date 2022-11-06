require("dotenv").config();
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const User = require("../models/Users");

let transport = nodemailer.createTransport({
  host: "smtppro.zoho.com",
  secure: true,
  port: 465,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

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

exports.forgetPassword = (req, res, next) => {
  let email = req.body.email;
  let token;

  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
        let error = new Error("An error occurred while generating token");
        error.statusCode = 401;
        throw error;
    }
    token = buffer.toString("hex");
  });

  User.findOne({ email: email })
    .then((userDoc) => {
      if (!userDoc) {
        let error = new Error("Email not found");
        error.statusCode = 404;
        throw error;
      }
      return userDoc;
    })
    .then((user) => {
      (user.reset_token = token),
        (user.reset_expiration = Date.now() + 3600000);
      return user.save();
    })
    .then((results) => {
        //todo Change the reset password link
      return transport.sendMail({
        from: "admin@eshopper.com.ng",
        to: req.body.email,
        subject: "Password Reset",
        html: `
            <h1>Reset Password</h1>
            <p>Click this <a href='http://kachi28.herokuapp.com/reset/${token}'>link</a> to reset your password</p>
            `,
      });
    })
    .then((info) => {
      if (!info) {
        let error = new Error(
          "An error occurred while sending the reset password email"
        );
        error.statusCode = 500;
        throw error;
      }
      res.status(200).json({ message: "Email successfully sent" });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};
