const cat_model = require("../models/category.models")
exports.createcategory = async (req,res)=>{
    // create the category object
    const cat_data = {
        name:req.body.name,
        description : req.body.description
    }
    // Insert into mongodb
    try{
        const cat_creation = await cat_model.create(cat_data)
        return res.status(200).send(cat_creation) 
    }
    catch(err){
        console.log("error",err)
        return res.status(500).send({
            message:"Error while creating new category"
        })
    }
}