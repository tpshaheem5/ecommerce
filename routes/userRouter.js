const express = require('express')
const app = express()
const bodyparser=require('body-parser')
const userController = require("../contoller/userController")
const checkUser = require('../middleware/userMiddleware')

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))

// app.use(express.json())
// app.use(express.urlencoded({extended:true}))

app.post("/signup",userController.signup)
app.post("/login",userController.login)
app.get("/products", userController.allProducts)
app.get("/products/:id",userController.specificProducts)

module.exports=app