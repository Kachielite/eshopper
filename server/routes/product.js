const express = require("express");
const { body } = require("express-validator");
const productController = require("../controllers/product");

const route = express.Router();

//Add Product Details
route.post(
  "/add_product",
  [
    body("product_name")
      .not()
      .isEmpty()
      .withMessage("Product is required")
      .trim(),
    body("product_description")
      .not()
      .isEmpty()
      .withMessage("Product description is required")
      .isLength({ min: 20 })
      .withMessage("Product description must have a minimum of 20 characters"),
    body("category")
      .not()
      .isEmpty()
      .withMessage("Product category is required")
      .isLength({ min: 3 })
      .withMessage("Product category must have a minimum of 3 characters"),
    body("price")
      .not()
      .isEmpty()
      .withMessage("Price is required")
      .isFloat({ min: 1 })
      .withMessage("Price must be a minimum of 1.00"),
    body("discount").isInt({ min: 0 }),
  ],
  productController.addProduct
);

//Upload product photos
route.post(
    "/products/add-product-photo",
     productController.uploadPhoto
);

//Update Product Details
route.put(
  "/update_product/:id",
  [
    body("product_name")
      .not()
      .isEmpty()
      .withMessage("Product is required")
      .trim(),
    body("product_description")
      .not()
      .isEmpty()
      .withMessage("Product description is required")
      .isLength({ min: 20 })
      .withMessage("Product description must have a minimum of 20 characters"),
    body("category")
      .not()
      .isEmpty()
      .withMessage("Product category is required")
      .isLength({ min: 3 })
      .withMessage("Product category must have a minimum of 3 characters"),
    body("price")
      .not()
      .isEmpty()
      .withMessage("Price is required")
      .isFloat({ min: 1 })
      .withMessage("Price must be a minimum of 1.00"),
    body("discount").isInt({ min: 0 }),
  ],
  productController.editProduct
);

//Get All Product
route.get('/products', productController.getAllProducts)

//Download
route.get('/products/download', productController.downloadCSV)

//Search
route.post('/products/search', productController.searchProduct)

//Fetch All Categories
route.get('/products/categories', productController.getAllCategories)

//Delete Product
route.post('/delete_product/:id', productController.deleteProduct)

module.exports = route;
