const express = require("express");
const { body } = require("express-validator");
const {isAuth} = require("../middleware/auth")
const productController = require("../controllers/product");

const route = express.Router();

//Add Product Details
route.post(
  "/products/add_product",
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


//Update Product Details
route.put(
  "/products/edit-product/:id",
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

//Get Product
route.get('/products/product-details/:id', isAuth, productController.getProduct)

//Download
route.get('/products/download', isAuth, productController.downloadCSV)

//Fetch All Categories
route.get('/products/categories', isAuth, productController.getAllCategories)

//Get All Product
route.get('/products', isAuth, productController.getAllProducts)

//Search
route.post('/products/search', isAuth, productController.searchProduct)

//Delete Product
route.delete('/products/delete-product/:id', isAuth, productController.deleteProduct)



module.exports = route;
