require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authRoute = require("./routes/authentication");

const app = express();
const port = process.env.PORT;

//Middleware
app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
  })
);

//routes
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
