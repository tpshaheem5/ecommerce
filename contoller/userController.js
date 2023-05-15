//const express = require("express");
const schema = require("../model/mongodb.js");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
//const session = require("express-session");
const pSchema = require("../model/productDatabase.js");

  const signup=async(req,res)=>{
  console.log(req.body)  
  await schema.insertMany({  
      username:req.body.username,
      email:req.body.email,
      password:req.body.password,
      isAdmin:req.body.isAdmin
  })  
  res.json("user registered")
}

const login= async (req, res) => {
  try {
    // console.log(req.body);
    const user = await schema.findOne({ email: req.body.email });
    if (user) {
      if (
        user.email == req.body.email &&
        user.password == req.body.password
      ) {
        res.json("User logged in successfully");
      } else {
        res.json("wrong password");
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "server error" });
  }
}

 const allProducts= async (req, res) => {
  try {
    const allProducts = await pSchema.find();
    res.json(allProducts);
  } catch (err) {
    res.json("error");
  }
}
// const allProducts = async (req, res) => {
//   try {

//     const allProducts = await pSchema.find();
//     res.json(allProducts);
//   } catch (err) {
//     console.error(err);
//     res.status(401).json({ error: 'Unauthorized access' });
//   }
// };




 const specificProducts = async (req, res) => {
  try {
    const Idproduct = await pSchema.findById(req.params.id);
    if (!Idproduct) {
      res.json({ message: "Product not found" });
    }
    res.json(Idproduct);
  } catch (err) {
    res.json({ message: "Server error" });
  }
}

module.exports = {
  signup,
  login,
  allProducts,
  specificProducts
}
