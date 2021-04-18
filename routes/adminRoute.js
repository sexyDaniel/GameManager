const express = require("express");
const adminController = require("../controllers/adminController.js");
const adminRoute = express.Router();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const urlencodedParser = bodyParser.urlencoded({extended: false});

adminRoute.use(cookieParser('secret key'))
adminRoute.use(function(request, response, next){
	var admin = JSON.parse(adminController.getCookie(request,response))
	if(admin.username==="admin12345"){
        next();
    }else{
        response.send("Ага, ещё чего тебе?")
    }
})

adminRoute.get("/jsonUsers",adminController.getJsonUsers)
adminRoute.get("/gameList", adminController.getGameList);
adminRoute.get("/addGame", adminController.getAddForm);
adminRoute.get("/users", adminController.getUsers);
adminRoute.get("/updateGame", adminController.getUpdateForm);
adminRoute.post("/addGame",urlencodedParser,adminController.addGame)
adminRoute.post("/deleteGame",urlencodedParser,adminController.deleteGame)
adminRoute.post("/updateGame",urlencodedParser,adminController.updateGame)
adminRoute.post("/deleteUser/:id",urlencodedParser,adminController.deleteUser)

module.exports = adminRoute;
