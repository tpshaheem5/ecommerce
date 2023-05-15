// const express = require("express")
const jwt = require("jsonwebtoken")
const schema = require("../model/mongodb")
const pSchema = require("../model/productDatabase")
const mongoose = require("mongoose");
const { json } = require("body-parser");



const login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // Check if email and password are valid
  if (email === "admin@example.com" && password === "password") {
   
    res.status(200).json({ message:"Admin registrade"});
  } else {  
    res.status(401).json({ message: "Invalid email or password" });
  }
};


const allUsers = async (req, res) => {
  try{
  const allUsers= await schema.find();
  res.json(allUsers)
  }catch(err){
    res.json('error')
    console.log(err);
  }
}


const specificUsers = async(req,res)=>{
  try {
    const Idusers = await schema.findById(req.params.id)
    if(!Idusers){
      res.json({message:'user not found'})
    }
    res.json(Idusers)
  } catch (error) {
    res.json('error')
  }
}



const  createProducts = async(req,res)=>{
  console.log(req.body);
   await pSchema.insertMany({
    title:req.body.title,
    description:req.body.description,
    price:req.body.price,
    image:req.body.image,
    category:req.body.category
   })
   res.json("product create succusss")
}

  
// const updateProduct = async (req, res) => {
//   try {
//   const productId = req.params.id; 
//   console.log(productId);
//   const { title, description, price, image, category } = req.body;

//     const result = await pSchema.findByIdAndUpdate({productId},{ title, description, price, image, category });
//      console.log(result) 
//     if (!result) {
//       return res.status(404).json({ message: "Product not found" });
//     } 
//     res.json({ message: "Product updated",result });
//   } catch (error) {

//     console.error(error);
//     res.status(500).json({ message: "Error updating product" });
//   }
// };

// update product
const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }
    console.log(productId);
    const { title, description, price, image, category } = req.body;

    const result = await pSchema.findByIdAndUpdate(productId, { title, description, price, image, category });
    console.log(result) 
    if (!result) {
      return res.status(404).json({ message: "Product not found" });
    } 
    res.json({ message: "Product updated",result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating product" });
  }
};


// read all products
const readProducts=async(req,res)=>{
  try {
    const allProducts  = await pSchema.find()
    res.json(allProducts)
  } catch (error) {
    res.json('error')
  } 
}

 const specificProducts=async(req,res)=>{
  try {
    const allProducts = await pSchema.findById(req.params.id)
    if(!allProducts){
      res.json({message:'product not found'})
    }
    res.json(allProducts)
  } catch (error) { 
    res.json('error')
  }
}

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    console.log(productId);

    const deletedProduct = await pSchema.findByIdAndDelete(productId);
    console.log(deletedProduct);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted', deletedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting product' });
  }
};



module.exports = {
  login,
  allUsers,
  specificUsers,
  createProducts,
  readProducts,
  specificProducts,
  updateProduct,
  deleteProduct
}