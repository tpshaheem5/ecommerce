const express = require('express')
const app = express()
const bodyparser=require('body-parser')
const userController = require("../contoller/userController")

const verifyToken = require('../middleware/userMiddleware')

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))

// app.use(express.json())
// app.use(express.urlencoded({extended:true}))

app.post("/signup", userController.signup)
app.post("/login",userController.userLogin)
app.get("/products",verifyToken, userController.allProducts)
app.get("/products/:id",verifyToken,userController.specificProducts)
app.get("/products/category/:category",verifyToken,userController.categoryData)
app.post("/products/cart/:id",verifyToken, userController.addTocart)
app.get("/cart",verifyToken,userController.getCart)
app.post("/products/wishlist/:id",verifyToken,userController.addToWishlist)
app.get("/wishlist",verifyToken,userController.getWishlist)



module.exports=app