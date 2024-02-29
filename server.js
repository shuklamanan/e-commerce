const express = require('express')
const mongoose = require('mongoose')
const server_configue = require('./configue/server.configue')
const db_configue = require('./configue/db.configue')
const user_model = require('./models/user.model')
const bcrypt = require('bcryptjs')
const app = express()

app.use(express.json()) //middleware from JSON to JS object
 
mongoose.connect(db_configue.db_url)
const db = mongoose.connection

db.on("error",()=>{
    console.log("Error while connecting to mongodb")
})
db.once("open",()=>{
    console.log("Connected to mongodb successfully")
    init()
})

async function init(){
    try{
        let user = await user_model.findOne({userid:"admin"})
        console.log(user)
        if(user){
            console.log(user.name)
            console.log("Admin is already present")
            return;
        }
    }
    catch(Err){
        console.log(Err)
    }
    try{
        user =await user_model.create({
            name:"Manan",
            userid:"admin",
            email:"abc@gmail.com",
            userType:"ADMIN",
            password:bcrypt.hashSync("hello1",8)
        })
        console.log("Admin created")
    }
    catch(err){
        console.log("Error while creating Admin" ,err)
    }
} 
require('./routes/auth.routes')(app); //pass app object to auth routes

app.listen(server_configue.port,()=>{
    console.log("Server is starting at " , server_configue.port)
})