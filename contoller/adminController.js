// const express = require("express")
const jwt = require("jsonwebtoken");
const schema = require("../model/mongodb");
const pSchema = require("../model/productDatabase");
const mongoose = require("mongoose");

const login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    // Check if email and password are valid
    if (email !== "admin@example.com" || password !== "password") {
      throw new Error("Invalid Email or Password");
    }
    const token = jwt.sign({ email }, "your-secret-key");
    res.cookie("token", token);
    res.setHeader("Authorization", token);
    res.status(200).json({ message: "Admin registrade" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server error" });
  }
};

const allUsers = async (req, res) => {
  try {
    const allUsers = await schema.find();
    res.json(allUsers);
  } catch (err) {
    res.json("error");
    console.log(err);
  }
};

const specificUsers = async (req, res) => {
  try {
    const Idusers = await schema.findById(req.params.id);
    if (!Idusers) {
      res.json({ message: "user not found" });
    }
    res.json(Idusers);
  } catch (error) {
    res.json("error");
  }
};

const createProducts = async (req, res) => {
  console.log(req.body);
  await pSchema.insertMany({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    image: req.body.image,
    category: req.body.category,
  });
  res.json("product create succusss");
};

// update product
const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }
    console.log(productId);
    const { title, description, price, image, category } = req.body;

    const result = await pSchema.findByIdAndUpdate(productId, {
      title,
      description,
      price,
      image,
      category,
    });
    console.log(result);
    if (!result) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product updated", result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating product" });
  }
};

// read all products
const readProducts = async (req, res) => {
  try {
    const allProducts = await pSchema.find();
    res.json(allProducts);
  } catch (error) {
    res.json("error");
  }
};

const specificProducts = async (req, res) => {
  try {
    const allProducts = await pSchema.findById(req.params.id);
    if (!allProducts) {
      res.json({ message: "product not found" });
    }
    res.json(allProducts);
  } catch (error) {
    res.json("error");
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    console.log(productId);

    const deletedProduct = await pSchema.findByIdAndDelete(productId);
    console.log(deletedProduct);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted", deletedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting product" });
  }
};

const categoryData = async (req, res) => {
  const categoryList = req.params.category;
  console.log(categoryList);
  try {
    let findproduct;
    if (categoryList == "nike") {
      const findproduct = await pSchema.find({ category: { $in: "nike" } });
      return res.json(findproduct);
    }
    if (categoryList == "puma") {
      const findproduct = await pSchema.find({ category: { $in: "puma" } });
      return res.json(findproduct);
    }
    if (categoryList == "new balance") {
      const findproduct = await pSchema.find({
        category: { $in: "new balance" },
      });
      return res.json(findproduct);
    }
    if (categoryList == "vans") {
      const findproduct = await pSchema.find({ category: { $in: "vans" } });
      return res.json(findproduct);
    }
    if (categoryList == "adidas") {
      const findproduct = await pSchema.find({ category: { $in: "adidas" } });
      return res.json(findproduct);
    }
    if (categoryList == "jordan") {
      const findproduct = await pSchema.find({ category: { $in: "jordan" } });
      return res.json(findproduct);
    } else {
      res.status(404).json("not found the product");
    }
  } catch (error) {
    console.log(err);
    res.status(500).json("Server Error");
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
  deleteProduct,
  categoryData,
};
