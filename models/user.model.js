const mongoose = require('mongoose')

const userschema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    userid:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        minLength:10,
        unique:true,
    },
    userType:{
        type:String,
        default:"CUSTOMER",
        enum:["CUSTOMER","ADMIN"]
    }
},{timestamps:true,versionKey:false})


module.exports = mongoose.model("users",userschema)