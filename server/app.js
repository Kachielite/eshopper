require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT;
app.use(bodyParser.json());

app.get("/", (req, res, next) => {
  res.status(200).json({ message: "server is responding well" });
});


//error handler
app.use((error, req, res, next)=>{
    let message = error.message
    let statusCode = error.statusCode
    res.status(statusCode).json({message})
})

mongoose
  .connect(
    `mongodb+srv://twiickle:${process.env.MONGODBCRED}@cluster0.pc0jurl.mongodb.net/?retryWrites=true&w=majority`
  )
  .then((res) => {
    app.listen(port, () => {
      console.log(`Server listening on ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
