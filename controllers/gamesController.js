var Game = require("../models/game.js");
var UserGame = require("../models/userGame.js")
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const atob = require("atob");
const User = require("../models/user.js");

var links = [
    {text:"Игры для скачивания",link:"/gameManager/DownloadGames"},
    {text:"Установленные игры",link:"/gameManager/installedGames"},
    {text:"Личный кабинет",link:"/gameManager/PersonalRoom"}
]

var games=null;
var moreInfoGame;

let orderBy = [
    {id:"gameName", order:{gameName:1}},
    {id:"diskSpace", order:{diskSpace:1}},
    {id:"developer", order:{developer:1}}
  ];

exports.getDownloadGames = async function(request,response){
    var cookie = JSON.parse(getCookie(request,response))
    games = await Game.find();
    games = games.map(games=>games.toJSON());
    response.render("DownloadGames.hbs",{
        username:cookie.username,
        isAdmin: false,
        links: links,
        games:games,
        activeIndex:0
    });
}

exports.getDownloadGames = async function(request,response){
    var cookie = JSON.parse(getCookie(request,response))
    games = await Game.find();
    games = games.map(games=>games.toJSON());
    response.render("DownloadGames.hbs",{
        username:cookie.username,
        isAdmin: false,
        links: links,
        games:games,
        activeIndex:0
    });
}

exports.getPersonalRoom = async function(request,response){
    var cookie = JSON.parse(getCookie(request,response))
    var user = await User.findOne({username:cookie.username})
    response.render("personalForm.hbs",{
        username:cookie.username,
        user:user.toJSON(),
        isAdmin: false,
        links: links,
        games:games,
        activeIndex:2
    });
}

exports.personalRoomChange =async function(request,response){
    await User.update({_id:request.body._id},{$set:{
        firtsName:request.body.FirstName,
        lastName:request.body.LastName,
        email:request.body.Email
    }})

    response.redirect("/gameManager/PersonalRoom")
}

exports.moreInfo = async function(request,response){
    var cookie = JSON.parse(getCookie(request,response))
    var gameName = request.params.gameName
    moreInfoGame = await Game.findOne({gameName:gameName})
    if(moreInfoGame){
        response.render("gameMoreInfo.hbs",{
            username:cookie.username,
            game:moreInfoGame.toJSON(),
            links: links,
            activeIndex:-1
        })
    }
}

exports.addGame = async function(request,response){
    var cookie = JSON.parse(getCookie(request,response))
    var gameId = request.body.id
    var userGames = await UserGame.find({userId:cookie.userId})
    var checkGame=null
    userGames.forEach((userGame)=>{
        if(userGame.gameId===gameId)
            checkGame = userGame.gameId
    })
    console.log(checkGame)
    if (checkGame){
        response.render("gameMoreInfo.hbs",{
            username:cookie.username,
            game:moreInfoGame.toJSON(),
            links: links,
            activeIndex:-1,
            errors:["Такая игра уже установлена"]
        })
    }else{
        var userGame = new UserGame({
            userId:cookie.userId,
            gameId:gameId
        })
        userGame.save(function(err,result){
            response.redirect("/gameManager/installedGames")
        });
    }
}

exports.getInstalledGames = async function(request,response){
    var cookie = JSON.parse(getCookie(request,response))
    var userGames = await UserGame.find({userId:cookie.userId})
    var gamesId  = userGames.map(game=>game.gameId)
    var games = []
    for(var i =0; i<gamesId.length;i++){
        var game = await Game.findOne({_id:gamesId[i]})
        games.push(game)
    }
    response.render("installedGames.hbs",{
        username:cookie.username,
        games:games.map(games=>games.toJSON()),
        links: links,
        activeIndex:1
    })
}

exports.deleteGame = function(request,response){
    var gameId = request.body.deleteGame
    UserGame.deleteOne({"gameId": gameId}, function (err, game) {
        response.redirect("/gameManager/installedGames")
    });
}

exports.sort = async function(request,response){
    var cookie = JSON.parse(getCookie(request,response))
    var sortRule = orderBy.find(item => item.id == request.body.sortGame);
    games = await Game.find().sort(sortRule.order);
    games = games.map(games=>games.toJSON());
    response.render("DownloadGames.hbs",{
        username:cookie.username,
        isAdmin: false,
        links: links,
        games:games,
        activeIndex:0
    });
}

exports.search = async function(request,response){
    var cookie = JSON.parse(getCookie(request,response))
    var findGame = request.body.searchGame;
    games = await Game.find({gameName:findGame});
    games = games.map(games=>games.toJSON());
    response.render("DownloadGames.hbs",{
        username:cookie.username,
        isAdmin: false,
        links: links,
        games:games,
        activeIndex:0
    });
}

getCookie = (req, res) => {
    var arr = req.cookies.token.split(".")
    return atob(arr[1])
}
