const express = require('express')
const app = express()
const bodyparser=require('body-parser')
const adminController = require('../contoller/adminController')

// app.use(express.json())
// app.use(express.urlencoded({extended:true}))
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))


app.post("/login",adminController.login)
app.post("/products",adminController.createProducts)
app.get("/users",adminController.allUsers)
app.get("/users/:id",adminController.specificUsers)
app.get("/products",adminController.readProducts)
app.get("/products/:id",adminController.specificProducts)
app.put("/productsupdate/:id",adminController.updateProduct)
app.delete("/product/:id",adminController.deleteProduct)

module.exports=app
