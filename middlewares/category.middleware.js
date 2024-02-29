const cat_model = require('../models/category.models')
const categoryverify = async (req,res,next)=>{
    try{
        if(!req.body.name){
            res.status(400).send({
                message:"name of category is missing"
            })
        }
        if(!req.body.description){
            res.status(400).send({
                message:"description of category is missing"
            })
        }
        next()
    }
    catch(Err){
        console.log("error",Err)
        res.status(500).send({
            message:"Error while reading request body"
        })
    }
}

module.exports = {categoryverify:categoryverify}