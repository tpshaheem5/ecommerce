const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const adminController = require("../contoller/adminController");
const adminVerifyToken = require("../middleware/adminMiddleware");

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.post("/login", adminController.login);
app.post("/products", adminController.createProducts);
app.get("/users", adminVerifyToken, adminController.allUsers);
app.get("/users/:id", adminController.specificUsers);
app.get("/products", adminVerifyToken, adminController.readProducts);
app.get("/products/:id", adminController.specificProducts);
app.put("/productsupdate/:id", adminController.updateProduct);
app.delete("/product/:id", adminController.deleteProduct);
app.get("/products/category/:category", adminController.categoryData);

module.exports = app;
