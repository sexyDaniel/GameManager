const express = require("express");
const adminController = require("../controllers/adminController.js");
const adminRoute = express.Router();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const urlencodedParser = bodyParser.urlencoded({extended: false});

adminRoute.use(cookieParser('secret key'))
 
adminRoute.get("/gameList", adminController.getGameList);
adminRoute.get("/addGame", adminController.getAddForm);
adminRoute.get("/users", adminController.getUsers);
adminRoute.post("/addGame",urlencodedParser,adminController.addGame)

module.exports = adminRoute;
