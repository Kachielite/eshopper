const fs = require("fs");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const multer = require("multer");
const upload = require("./utils/upload")

const authRoute = require("./routes/authentication");
const prodRoute = require("./routes/product")


const app = express();
const port = process.env.PORT || 3001;

//Middleware
app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer({storage: upload.fileStorage, fileFilter: upload.fileFiltering}).any())



//routes
app.use("/v1", authRoute);
app.use("/v1", prodRoute)
app.get("/", (req, res, next) => {
  res.status(200).json({ message: "server is responding well" });
});

//error handler
app.use((error, req, res, next) => {
  console.log(error);
  let message = error.message;
  let statusCode = error.statusCode || 500;
  let data = error.data;
  res.status(statusCode).json({ message: message, errors: data });
});

mongoose
  .connect(
    `mongodb+srv://twiickle:${process.env.MONGODBCRED}@cluster0.pc0jurl.mongodb.net/data?retryWrites=true&w=majority`,{ ignoreUndefined: true }
  )
  .then((res) => {
    app.listen(port, () => {
      console.log(`Server listening on ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
