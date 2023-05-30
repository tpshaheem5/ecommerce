// const express = require("express");
// const schema = require("../model/mongodb.js");
const schema = require("../model/mongodb");
const jwt = require("jsonwebtoken");
const Razorpay = require("razorpay");

const pSchema = require("../model/productDatabase.js");
const { model, Schema } = require("mongoose");

const signup = async (req, res) => {
  console.log(req.body);
  await schema.insertMany({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    isAdmin: req.body.isAdmin,
  });
  res.json("user registered");
};

const userLogin = async (req, res) => {
  try {
    const login = await schema.findOne({ email: req.body.email });

    if (login.email == req.body.email && login.password === req.body.password) {
      const token = jwt.sign({ email: login.email }, "secret-key");
      res.cookie("token", token);
      res.json({ message: "User logged in successfully" });
      return;
    }
    res.status(401).json({ error: "Wrong password or email" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server error" });
  }
};

const allProducts = async (req, res) => {
  try {
    const allProducts = await pSchema.find();
    res.json(allProducts);
  } catch (err) {
    res.json("error");
  }
};

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
      res.status(404).json("not found the category");
    }
  } catch (error) {
    console.log(err);
    res.status(500).json("Server Error");
  }
};

const addTocart = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await pSchema.findById(productId);
    console.log(product);
    if (!product) {
      return res.json({ message: "product not found" });
    }

    const token = req.cookies.token;
    const verified = jwt.verify(token, "secret-key");
    console.log(verified);
    const user = await schema.findOne({ email: verified.email });

    // Add the product to the user's cart
    user.cart.push(product);
    await user.save();

    res.json({ message: "Product added to the cart" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCart = async (req, res) => {
  try {
    const token = req.cookies.token;
    const verified = jwt.verify(token, "secret-key");
    console.log(verified);

    const user = await schema.findOne({ email: verified.email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const cartItems = user.cart;

    res.status(200).json({ message: "Your cart products", cart: cartItems });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error", error: error.message });
  }
};

const removeCart = async (req, res) => {
  try {
    const productId = req.params.id;
    const token = req.cookies.token;
    const verified = jwt.verify(token, "secret-key");

    const user = await schema.findOne({ email: verified.email });
    if (!user) {
      res.status(404).json({ message: "user not found" });
    }

    const index = user.cart.indexOf(productId);
    if (index == 1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    user.cart.splice(index, 1);
    await user.save();
    res.status(200).json({ message: "Product removed from your cart" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error", message: error.message });
  }
};

const addToWishlist = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await pSchema.findById(productId);
    console.log(product);
    if (!product) {
      return res.json({ message: "product not found" });
    }
    // const email = req.body.email;
    // const user = await schema.findOne({email})

    const token = req.cookies.token;
    const decoded = jwt.verify(token, "secret-key");

    // Add the product to the user's cart
    user.wishList.push(product);
    await user.save();

    res.json({ message: "Product added to the wish list" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getWishlist = async (req, res) => {
  try {
    const token = req.cookies.token;
    const verified = jwt.verify(token, "secret-key");

    const user = await schema.findOne({ email: verified.email });
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }
    const wishlistItems = user.wishList;
    res
      .status(200)
      .json({ message: "your wishlist items", wishlist: wishlistItems });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error", error: error.message });
  }
};

const removeWishlist = async (req, res) => {
  try {
    const productId = req.params.id;
    const token = req.cookies.token;
    const verified = jwt.verify(token, "secret-key");

    const user = await schema.findOne({ email: verified.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const index = user.wishList.indexOf(productId);
    if (index == 1) {
      return res.status(404).json({ message: "Product not found in wishlist" });
    }

    user.wishList.splice(index, 1);
    await user.save();

    res.status(200).json({ message: "Product removed from your wishlist" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error", message: error.message });
  }
};

const orderProducts = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await pSchema.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }
    const token = req.cookies.token;
    const verified = jwt.verify(token, "secret-key");
    const user = await schema.findOne({ email: verified.email });

    const orderDate = new Date();
    const { price } = product;

    if (price !== req.body.price) {
      return res
        .status(400)
        .json({ message: "THe entered price does not mach the product price" });
    }

    const instance = new Razorpay({
      key_id: "rzp_test_lcdp3oIEzg2qkR",
      key_secret: "elHVCagf8LjkX7AEhQL194tM",
    });

    const order = await instance.orders.create({
      amount: price * 100,
      currency: "INR",
      receipt: "Receipt",
    });

    user.orders.push({
      product: productId,
      orderId: order.id,
      payment: price,
      orderDate,
    });
    await user.save();
    res.status(200).json({ message: "payment successfull....order comfirmed" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
};

module.exports = {
  signup,
  userLogin,
  allProducts,
  specificProducts,
  categoryData,
  addTocart,
  getCart,
  removeCart,
  addToWishlist,
  getWishlist,
  removeWishlist,
  orderProducts,
};
