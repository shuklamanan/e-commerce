const createcat = require("../controllers/category.controller")
const cat_middleware = require("../middlewares/category.middleware")
const auth_middleware = require("../middlewares/auth.middleware")
module.exports = (app)=>{
    app.post("/ecommerce/api/v1/categories",[cat_middleware.categoryverify,auth_middleware.verifytoken,auth_middleware.isadmin],createcat.createcategory)
}