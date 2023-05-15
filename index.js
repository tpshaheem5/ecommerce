const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session")

  
mongoose.connect("mongodb://127.0.0.1:27017/eCommerce")
  .then(() => {
    console.log("mongodb connected");
  })
  .catch(() => {
    console.log("failed to connect");
  });

  
// app.use(cookieParser());
// app.use(session({
//     secret: "secretkey",
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//       maxAge: 60 * 60 * 1000, //1 hour
//       httpOnly: true,
//       secure: true,
//       sameSite: "none",
//     },
//   })
// )

// const user = require("./contoller/userController");
// const admin = require("./contoller/adminController");

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 

// admin routes
const adminRouter = require('./routes/adminRouter')
app.use('/admin',adminRouter)

// user route
const userRouter = require('./routes/userRouter')
app.use('/user',userRouter)

app.listen(5000, () => {
  console.log("Server is connected 5000");
});
