const bcrypt = require('bcryptjs')
const user_model = require('../models/user.model')
const jwt = require("jsonwebtoken")
const secret = require("../configue/auth.secret.controller")

exports.signup = async (req,res)=>{
    const request_body = req.body
    const user_obj = {
        name:request_body.name,
        userid:request_body.userid,
        email:request_body.email,
        usertype:request_body.usertype,
        password:bcrypt.hashSync(request_body.password,8)
    }
    try{
        const res_object = {
            name:user_obj.name,
            email:user_obj.email,
            userid:user_obj.userid,
            usertype:user_obj.usertype
        }
        const user_creation = await user_model.create(user_obj);

        res.status(200).send(res_object)
    }
    catch(err){
        console.log("error while creating user ", err)
        res.status(500).send({msg:"error happened while registering user"})
    }
}

exports.signin = async (req,res)=>{
    // check if userid is present in the system or not
    const user = await user_model.findOne({userid:req.body.userid})
    if(user==null){
        res.status(400).send({message:"User id is not valid user id"})
    }

    // password is correct
    const ispassword = bcrypt.compareSync(req.body.password,user.password) //comparesync first of all encypt req.body.password and then compare to user.password
    if(!ispassword){
        res.status(401).send({
            message:"Wrong password passed"
        })
    }

    // using jwt we will create the access token with a given TTL return
    const token = jwt.sign({id:user.userid},secret.secret,{expiresIn:120})

    res.status(200).send({
        name:user.name,
        userid:user.userid,
        email:user.email,
        usertype:user.usertype,
        accesstoken:token
    })
}