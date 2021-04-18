const express = require("express");
const gamesController = require("../controllers/gamesController.js");
const gameRoute = express.Router();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const urlencodedParser = bodyParser.urlencoded({extended: false});

gameRoute.use(cookieParser('secret key'))

gameRoute.get("/DownloadGames",gamesController.getDownloadGames)
gameRoute.get("/installedGames",gamesController.getInstalledGames)
gameRoute.get("/DownloadGames/:gameName",gamesController.moreInfo)
gameRoute.get("/PersonalRoom",gamesController.getPersonalRoom)
gameRoute.post("/DownloadGames/AddGame",urlencodedParser,gamesController.addGame)
gameRoute.post("/installedGames/deleteGame",urlencodedParser,gamesController.deleteGame)
gameRoute.post("/DownloadGames/Sort",urlencodedParser,gamesController.sort)
gameRoute.post("/DownloadGames/Search",urlencodedParser,gamesController.search)
gameRoute.post("/PersonalRoom/Change",urlencodedParser,gamesController.personalRoomChange)

module.exports = gameRoute;