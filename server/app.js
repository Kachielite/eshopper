require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authRoute = require("./routes/authentication");

const app = express();
const port = process.env.PORT;

//Middleware
app.use(cors());
app.use((req, res, next) => {
  userId = req.userId;
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Origin"
  );
  next();
});
app.use(bodyParser.json());

//routes
app.use("/v1", cors());
app.use("/v1", cors(), authRoute);
app.get("/", (req, res, next) => {
  res.status(200).json({ message: "server is responding well" });
});

//error handler
app.use((error, req, res, next) => {
  let message = error.message;
  let statusCode = error.statusCode;
  let data = error.data;
  res.status(statusCode).json({ message: message, errors: data });
});

mongoose
  .connect(
    `mongodb+srv://twiickle:${process.env.MONGODBCRED}@cluster0.pc0jurl.mongodb.net/data?retryWrites=true&w=majority`
  )
  .then((res) => {
    app.listen(port, () => {
      console.log(`Server listening on ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
