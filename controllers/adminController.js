var User = require("../models/user.js");
var Game = require("../models/game.js");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const atob = require("atob")

var links = [
    {text:"Список игр",link:"/admin/gameList"},
    {text:"Добавить игру",link:"/admin/addGame"},
    {text:"Пользователи",link:"/admin/users"},
    {text:"Выход",link:"/admin/logout"}
]

exports.getAddForm = function (request, response) {
    var cookie = JSON.parse(getCookie(request,response))
    response.render("addGame.hbs",{
        username:cookie.username,
        isAdmin: true,
        links: links,
        activeIndex:1
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
    response.render("usersList.hbs",{
        username:cookie.username,
        isAdmin: true,
        links: links,
        users:users.map(user=>user.toJSON()),
        activeIndex:2
    });
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
    
}

exports.updateGame = async function (request, response) {
    
}

exports.deleteUser = async function (request, response) {
    
}

getCookie = (req, res) => {
    console.log('Cookie: ', req.cookies)
    var arr = req.cookies.token.split(".")
    console.log(arr)
    console.log(atob(arr[1]))
    return atob(arr[1])
}

// exports.register = async function (request, response,next) {
//     console.log(request.body.userLogin);
//     const candidate = await User.findOne({username:request.body.userLogin});
//     if (candidate){
//         response.status(409).json({message:"Такой пользователь уже есть"})
//     }
//     else{
//         var newUser = new User({
//             "username": request.body.userLogin,
//             "password": bcrypt.hashSync(request.body.userPassword, bcrypt.genSaltSync(10), null)
//         });
//         newUser.save(function (err, result) {
//             console.log(result);
//             setCookie(request,response,result)
//         });
//         response.render("gameList.hbs",{
//             isRegister: false,
//             username:request.body.userLogin
//         });
//     }
// }