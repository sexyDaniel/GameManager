const express = require("express");
const registerController = require("../controllers/registerController.js");
const registerRoute = express.Router();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const urlencodedParser = bodyParser.urlencoded({extended: false});

registerRoute.use(cookieParser('secret key'))
 
registerRoute.get("/", registerController.index);
registerRoute.post("/register",urlencodedParser, registerController.register);
registerRoute.post("/login",urlencodedParser, registerController.login);
registerRoute.post("/logout", registerController.logout);

registerRoute.get('/get-cookie', registerController.getCookie)
 
module.exports = registerRoute;