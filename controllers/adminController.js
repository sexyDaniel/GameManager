var User = require("../models/user.js");
var Game = require("../models/game.js");
var UserGames = require("../models/userGame.js");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const atob = require("atob");

var links = [
    {text:"Список игр",link:"/admin/gameList"},
    {text:"Добавить игру",link:"/admin/addGame"},
    {text:"Пользователи",link:"/admin/users"}
]

exports.getAddForm = function (request, response) {
    var cookie = JSON.parse(getCookie(request,response))
    response.render("addGame.hbs",{
        username:cookie.username,
        isAdmin: true,
        links: links,
        activeIndex:1,
        isAddForm:true
    });
}

exports.getGameList = async function (request, response) {
    var cookie = JSON.parse(getCookie(request,response))
    var games = await Game.find()
    response.render("gameList.hbs",{
        username:cookie.username,
        isAdmin: true,
        links: links,
        games:games.map(game => game.toJSON()),
        activeIndex:0
    });
}

exports.getUsers = async function (request, response) {
    var cookie = JSON.parse(getCookie(request,response))
    var users = await User.find();
    var userList = []
    for(var i =0;i<users.length;i++){
        var user = users[i].toJSON()
        if (user.username!=="admin12345")
        userList.push(user)
    }
    response.render("usersList.hbs",{
        username:cookie.username,
        isAdmin: true,
        links: links,
        users:userList,
        activeIndex:2
    });
}

exports.getJsonUsers = async function (request, response) {
    var users = await User.find();
    var userList = []
    for(var i =0;i<users.length;i++){
        var user = users[i].toJSON()
        if (user.username!=="admin12345")
        userList.push(user)
    }
    response.status(200).json(userList);
}

exports.addGame = async function (request, response) {
    const game = await Game.findOne({gameName:request.body.gameName})
    if (game){
        response.status(409).json({message:"Такая игра уже есть"})
    }else{
        const newGame = new Game({
            gameName: request.body.gameName,
            developer:request.body.gameDaveloper,
            publisher:request.body.publisher,
            publicationDate:request.body.publicationDate,
            photoLink:request.body.photoLink,
            infoPhotoLink:request.body.infoPhotoLink,
            gameDescription : request.body.gameDescription,
            os: request.body.os,
            processor: request.body.processor,
            RAMmemory:request.body.RAMmemory,
            diskSpace:request.body.diskSpace,
            videocard:request.body.videocard
        })
        newGame.save(function (err, result) {
            console.log(result);
        });
        response.redirect("/admin/addGame")
        
    }
}

exports.deleteGame = async function (request, response) {
    var daleteId = request.body.deleteGame;
    console.log(daleteId)
    var deleteGame = await Game.findOne({_id:daleteId})
    if(deleteGame){
        console.log(deleteGame)
        await Game.remove({_id:daleteId})
        await UserGames.remove({gameId:daleteId})
        response.redirect("/admin/gameList")
    }
}

exports.getUpdateForm = async function (request, response) {
    var cookie = JSON.parse(getCookie(request,response))
    var updateGame = await Game.findOne({_id:request.query.id})
    if(updateGame){
        response.render("updateGame.hbs",{
            username:cookie.username,
            updateGame:updateGame.toJSON(),
            isAdmin: true,
            links: links,
            activeIndex:-1,
            isAddForm:true
        });
    }
}

exports.updateGame = async function (request,response){
    await Game.update({_id:request.body.id},{
        gameName: request.body.gameName,
        developer:request.body.gameDaveloper,
        publisher:request.body.publisher,
        publicationDate:request.body.publicationDate,
        photoLink:request.body.photoLink,
        infoPhotoLink:request.body.infoPhotoLink,
        gameDescription : request.body.gameDescription,
        os: request.body.os,
        processor: request.body.processor,
        RAMmemory:request.body.RAMmemory,
        diskSpace:request.body.diskSpace,
        videocard:request.body.videocard
    })
    response.redirect("/admin/gameList")
}

exports.deleteUser = async function (request, response) {
    console.log("Удаление пользователя")
    var deleteId = request.params.id;
    console.log(deleteId)
    var deleteUser= await User.findOne({_id:deleteId})
    if(deleteUser){
        console.log(deleteUser)
        await User.remove({_id:deleteId})
        await UserGames.remove({userId:deleteId})
        response.redirect("/admin/users")
    }
}

exports.getCookie = (req, res) => {
    var arr = req.cookies.token.split(".")
    return atob(arr[1])
}

