/**
    POST ->
*/

const authcontroller = require("../controllers/user.controller")
module.exports  =(app)=>{
    app.post("/ecommerce/api/v1/auth/signup",authcontroller.signup)
}