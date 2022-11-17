const Product = require("../models/Product");
const { validationResult } = require("express-validator");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();
const deleteFile = require("../utils/deleteImage");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.addProduct = async (req, res, next) => {
  const productName = req.body.product_name;
  const productDescription = req.body.product_description;
  const category = req.body.category;
  const price = req.body.price;
  const discount = req.body.discount;
  const tags = req.body.tags;
  const status = req.body.status;
  const photos = req.files;

  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    let error = new Error("Invalid input data");
    error.status = 412;
    error.data = errors.array();
    throw error;
  }

  const product = new Product();

  product.product_name = productName;
  product.product_description = productDescription;
  product.category = category;
  product.price = price;
  product.discount = discount;
  product.tags = tags;
  product.status = status;

  const uploadPhoto = (file) => {
    return new Promise((resolve) => {
      cloudinary.uploader.upload(
        file,
        (results) => {
          resolve({ url: results.url, id: results.public_id });
        },
        { folder: "eshopper-photos" }
      );
    });
  };

//   try {
//     let uploadedPhoto = [];
//     if (photos.length > 0) {
//       photos.map((photo) => {
//         product.photo_images = uploadedPhoto.push(uploadPhoto(photo.path));
//       });
//     } else {
//       return (product.photo_images = uploadedPhoto);
//     }

//     try {
//       const uploadedProduct = await product.save();
//       res
//         .status(201)
//         .json({
//           message: "Product successfully added",
//           productId: uploadedProduct._id.toString(),
//         });
//     } catch (error) {
//       console.log(error);
//     }
//   } catch (error) {
//     console.log(error);
//     if (!error.statusCode) {
//       error.statusCode = 500;
//     }
//   }

  //   uploadPhotos()
  //     .then((results) => {
  //       product.product_images = results;
  //       return product.save();
  //     })
  //     .then((results) => {
  //       res.status(201).json({ message: "Product successfully added" });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       if (!error.statusCode) {
  //         error.statusCode = 500;
  //       }
  //       throw error;
  //     });
};
