const Product = require("../models/Product");
const { validationResult } = require("express-validator");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();
const deleteFile = require("../utils/deleteImage");
const { Parser } = require("json2csv");
const fs = require("fs");
const path = require("path");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadPhoto = (photoArray) => {
  return new Promise((resolve, reject) => {
    let urlArray = [];
    if(photoArray.length === 0){
      resolve(urlArray)
    }else{
      photoArray.map((photo) => {
        cloudinary.uploader
            .upload(photo.path, { folder: "eshopper-photos" })
            .then((results) => {
              urlArray.push({ url: results.url, id: results.public_id });
              deleteFile(photo.path);
              if (urlArray.length === photoArray.length) {
                resolve(urlArray);
              }
            })
            .catch((error) => {
              reject(error);
            });
      });
    }
  });
};

const deletePhoto = (photoArray) => {
  return new Promise((resolve, reject) => {
    photoArray.map((photo) => {
      if (!photo.id) {
        resolve(true);
      } else {
        cloudinary.uploader
          .destroy(photo.id)
          .then((results) => {
            resolve(true);
          })
          .catch((error) => {
            reject(error);
          });
      }
    });
  });
};


exports.getProduct = (req, res, next) => {
  const id = req.params.id;

  Product.findById(id).then((product) => {
    if(!product){
      return res.status(404).json({message: `Product with id:${id} can not be found`})
    }
    return res.status(200).json({message: "Product successfully fetched", product: product})
  }).catch(error => {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  })
}

exports.getAllProducts = (req, res, next) => {
  const page = req.query.page;
  const productPerPage = req.query.quantity;
  const category = req.query.category;
  const status = req.query.status;
  let totalNumberOfProducts;

  let query;
  if (category.includes("All") && status.includes("All")) {
    query = {};
  } else {
    if ((category && !status) || (category && status.includes("All"))) {
      query = { category: { $eq: category } };
    } else if ((!category && status) || (category.includes("All") && status)) {
      query = { status: { $eq: status } };
    } else if (category && status) {
      query = {
        $and: [{ category: { $eq: category } }, { status: { $eq: status } }],
      };
    } else {
      query = {};
    }
  }

  Product.find(query)
    .count()
    .then((number) => {
      totalNumberOfProducts = number;
      return Product.find(query)
        .skip((page - 1) * productPerPage)
        .limit(productPerPage);
    })
    .then((results) => {
      res.status(200).json({
        message: "Products successfully fetched",
        products: results,
        totalNumberOfProducts: totalNumberOfProducts,
        lastPage: Math.ceil(totalNumberOfProducts / productPerPage),
        nextPage:
          parseInt(page) === Math.ceil(totalNumberOfProducts / productPerPage)
            ? null
            : parseInt(page) + 1,
        previousPage: parseInt(page) - 1 === 0 ? null : parseInt(page) - 1,
      });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};

exports.getAllCategories = (req, res, next) => {
  Product.find().distinct("category", (error, results) => {
    if (error) {
      next(error);
    }
    res
      .status(200)
      .json({ message: "Categories successfully fetched", category: results });
  });
};


exports.addProduct = (req, res, next) => {
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
    error.statusCode = 412;
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

  uploadPhoto(photos)
    .then((array) => {
      product.product_images = array;
      return product.save();
    })
    .then((results) => {
      res.status(201).json({
        message: "Product successfully added",
        productId: results._id.toString(),
      });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};


exports.editProduct = (req, res, next) => {
  const id = req.params.id;
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
    error.statusCode = 412;
    error.data = errors.array()
    throw error;
  }

  Product.findById(id).then((product) => {
    if (!product) {
      let error = new Error(`Product with id:${id} does not exist`);
      error.statusCode = 404;
      throw error;
    }
    product.product_name = productName;
    product.product_description = productDescription;
    product.category = category;
    product.price = price;
    product.discount = discount;
    product.tags = tags;
    product.status = status;

    if (req.files.length != 0) {
      uploadPhoto(photos)
        .then((array) => {
          product.product_images.push([...array]);
          return product.save();
        })
        .then((results) => {
          res.status(201).json({
            message: "Product successfully updated",
            productId: results._id.toString(),
          });
        })
        .catch((error) => {
          if (!error.statusCode) {
            error.statusCode = 500;
          }
          next(error);
        });
    } else {
      product
        .save()
        .then((results) => {
          res.status(201).json({
            message: "Product successfully updated",
            productId: results._id.toString(),
          });
        })
        .catch((error) => {
          if (!error.statusCode) {
            error.statusCode = 500;
          }
          next(error);
        });
    }
  });
};


exports.deleteProduct = (req, res, next) => {
  const id = req.params.id;

  Product.findById(id)
    .then((product) => {
      deletePhoto(product.product_images);
    })
    .then(() => {
      return Product.deleteMany({_id:{$in:id}});
    })
    .then((results) => {
      res.status(200).json({ message: "Products successfully deleted" });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};



exports.downloadCSV = (req, res, next) => {
  const category = req.query.category;
  const status = req.query.status;

  let query;
  if (category.includes("All") && status.includes("All")) {
    query = {};
  } else {
    if ((category && !status) || (category && status.includes("All"))) {
      query = { category: { $eq: category } };
    } else if ((!category && status) || (category.includes("All") && status)) {
      query = { status: { $eq: status } };
    } else if (category && status) {
      query = {
        $and: [{ category: { $eq: category } }, { status: { $eq: status } }],
      };
    } else {
      query = {};
    }
  }

  const fields = ["PRODUCT NAME", "CATEGORY", "PRICE", "DATE", "STATUS"];
  const opts = { fields };
  const transformOpts = {};
  const asyncOpts = {};

  //For unique file name
  const dateTime = new Date()
    .toISOString()
    .slice(-24)
    .replace(/\D/g, "")
    .slice(0, 14);

  const rootDirectory = path.dirname(require.main.filename);
  const filePath = path.join(
    rootDirectory,
    "exports",
    "csv-" + dateTime + ".csv"
  );

  Product.find(query)
    .select({ product_name: 1, category: 1, price: 1, status: 1, createdAt: 1 })
    .then((results) => {
      const json2csv = new Parser();
      const csv = json2csv.parse(results);
      console.log(`csv ${csv}`);
      fs.promises.writeFile(filePath, csv);
    })
    .then(() => {
      res.setHeader("Content-disposition", "attachment; filename=data.csv");
      res.setHeader("Content-Type", "text/csv");
      res.status(200).download(filePath);
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};

//Search Product
exports.searchProduct = (req, res, next) => {
  const query = req.body.query;

  Product.aggregate([
    {
      $search: {
        compound: {
          should: [
            {
              autocomplete: {
                query: query,
                path: "product_name",
                fuzzy: {
                  maxEdits: 2,
                  prefixLength: 3,
                },
              },
            },
            {
              autocomplete: {
                query: query,
                path: "category",
                fuzzy: {
                  maxEdits: 2,
                  prefixLength: 3,
                },
              },
            },
          ],
        },
      },
    },
  ])
    .then((results) => {
      res.status(200).json({ searchResults: results });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};
