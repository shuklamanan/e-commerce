const user_model = require('../models/user.model')

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

module.exports = {verify:verify}