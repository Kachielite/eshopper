const fs = require("fs");
const multer = require("multer");

//Product Image Upload
//1. Check if the upload folder exist
if (!fs.existsSync("./uploads/productPhoto")) {
  fs.mkdirSync("./uploads/productPhoto");
}
//2. Multer Set up
exports.fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/productPhoto");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
//3.File filtering
exports.fileFiltering = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    const error = new Error(
      "Unsupported file format. Only png,jpeg,jpg are allowed"
    );
    error.statusCode = 500;
    throw error;
  }
};
