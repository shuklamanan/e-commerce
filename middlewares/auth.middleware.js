const user_model = require('../models/user.model')
const jwt = require('jsonwebtoken')
const auth_config = require('../configue/auth.secret.controller')

const verify = async (req,res,next)=>{
    try{
        if(!req.body.name){
            return res.status(400).send({
                msg:"Name is empty"
            })
        }
        if(!req.body.email){
            return res.status(400).send({
                msg:"email is empty"
            })
        }
        if(!req.body.userid){
            return res.status(400).send({
                msg:"userid is empty"
            })
        }
        if(!req.body.password){
            return res.status(400).send({
                msg:"password is empty"
            })
        }
        if(user_model.findOne({userid:req.body.userid})){
            return res.status(400).send({
                msg:"User is already present"
            })
        }
        next()
    }
    catch(err){
        console.log("Error" ,err)
        res.status(500).send({
            msg:"Error while validating request body"
        })
    }
}
const signinverify = async (req,res,next)=>{
    try{
        if(!req.body.password){
            res.status(400).send({
                message:"Password is missing..."
            })
        }
        if(!req.body.userid){
            res.status(400).send({
                message:"userid is missing..."
            })
        }
        next()
    }
    catch(err){
        console.log("Error", err)
        res.status(500).send({
            message:"Error while signin verify"
        })
    }
}

const verifytoken = (req,res,next)=>{
    // check if token is present or not
    const token =  req.headers['x-access-token'];
    if(!token){
        return res.status(403).send({
            message:"Unauthorized"
        })
    }

    // if it's valid token
    jwt.verify(token,auth_config.secret,async (err,decoded)=>{
        if(err){
            // console.log(err)
            return res.status(401).send({
                message:"UnAuthorized",
                err:err
            })
        }
        const user = await user_model.findOne({userid:decoded.id})
        if(!user){
            return res.status(401).send({
                message:"Unauthorized this user for token doesn't exist"
            })
        }
        req.user = user
        next()
    })
}

const isadmin = (req,res,next)=>{
    const user = req.user
    if(user && user.usertype=="ADMIN"){
        next()
    }else{
        return res.status(403).send({
            message:"You are not admin , you can not create categories"
        })
    }
}

module.exports = {signinverify:signinverify,verify:verify,verifytoken:verifytoken,isadmin:isadmin}