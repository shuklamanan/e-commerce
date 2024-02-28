const bcrypt = require('bcryptjs')
const user_model = require('../models/user.model')

exports.signup = async (req,res)=>{
    const request_body = req.body
    const user_obj = {
        name:request_body.name,
        userid:request_body.userid,
        email:request_body.email,
        usertype:request_body.usertype,
        password:bcrypt.hash(request_body.password,8)
    }
    try{
        const user_creation = await user_model.create(user_obj);
        res.status(200).send("user created")
    }
    catch(err){
        console.log("error while creating user ", err)
        res.status(500).send({msg:"error happened while registering user"})
    }
}