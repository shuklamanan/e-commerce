/**
    POST ->
*/
const authcontroller = require("../controllers/user.controller")
const authmiddleware = require('../middlewares/auth.middleware')

module.exports = (app)=>{
    app.post("/ecommerce/api/v1/auth/signup",[authmiddleware.verify],authcontroller.signup)
    app.post("/ecommerce/api/v1/auth/signin",[authmiddleware.signinverify],authcontroller.signin)
}