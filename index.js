const express = require("express");
const app = express();
const mongoose = require("mongoose");

const cookieParser = require("cookie-parser");
// const session = require("express-session")

  
mongoose.connect("mongodb://127.0.0.1:27017/eCommerce") //x
  .then(() => {
    console.log("mongodb connected");
  })
  .catch(() => {
    console.log("failed to connect");
  });

  app.use(cookieParser());
// app.use(cookieParser());

// const user = require("./contoller/userController");
// const admin = require("./contoller/adminController");

// app.use(express.urlencoded({ extended: true }));
app.use(express.json()); //x

// admin routes
const adminRouter = require('./routes/adminRouter')
app.use('/admin',adminRouter)

// user route
const userRouter = require('./routes/userRouter')
app.use('/user',userRouter)

app.listen(5000, () => {
  console.log("Server is connected 5000");
});
