const mongoose = require("mongoose")
// const pSchema = require("../model/productDatabase")

const signupSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    cart:
    [

        {
            type:String,
            required:false
        }
    ]
     ,
     wishList:[{
        type:String
     }],
     orders:[
        {
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"pSchema"
            },
            orderId:{
                type:String
            },
            payment:{
                type:Number
            },
            orderData:{
                type:Date,
                default:Date.now
            }
        }
     ]

})
module.exports= mongoose.model("ecollection",signupSchema)