const mongoose = require("mongoose")

const categoryschema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:true,
    }
},{timestamps:true,versionKey:false})

module.exports = mongoose.model("category",categoryschema)