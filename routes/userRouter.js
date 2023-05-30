const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const userController = require("../contoller/userController");

const verifyToken = require("../middleware/userMiddleware");

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.post("/signup", userController.signup);
app.post("/login", userController.userLogin);
app.get("/products", verifyToken, userController.allProducts);
app.get("/products/:id", verifyToken, userController.specificProducts);
app.get("/products/category/:category",verifyToken,userController.categoryData);
app.post("/products/cart/:id", verifyToken, userController.addTocart);
app.get("/cart", verifyToken, userController.getCart);
app.delete("/products/cart/:id", verifyToken, userController.removeCart);
app.post("/products/wishlist/:id", verifyToken, userController.addToWishlist);
app.get("/wishlist", verifyToken, userController.getWishlist);
app.delete("/products/wishlist/:id",verifyToken,userController.removeWishlist);
app.post("/order/:id", verifyToken, userController.orderProducts);

module.exports = app;
