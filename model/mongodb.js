const mongoose = require("mongoose")

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
    
    // isAdmin:{
    //     type:Number,
    //     require:false
    // }
})
module.exports= mongoose.model("ecollection",signupSchema)