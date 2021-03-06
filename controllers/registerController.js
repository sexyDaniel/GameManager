var User = require("../models/user.js");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const atob = require("atob")

exports.index = function (request, response) {
    response.render("register.hbs",{
        isRegister: true
    });;
}

exports.register = async function (request, response) {
    console.log(request.body.userLogin);
    const candidate = await User.findOne({username:request.body.userLogin});
    if (candidate){
        response.render("register.hbs",{
            isRegister: true,
            errors:["Такой пользователь уже есть"]
        });
    }
    else{
        var newUser = new User({
            "username": request.body.userLogin,
            "password": bcrypt.hashSync(request.body.userPassword, bcrypt.genSaltSync(10), null),
            "firtsName":"",
            "lastName":"",
            "email":""
        });
        newUser.save(function (err, result) {
            console.log(result);
            setCookie(request,response,result)
            response.redirect("/gameManager/DownloadGames");
        });
    }
}

exports.login = async function (request, response) {
    console.log(request.body.userLogin)
    const condidate = await User.findOne({username:request.body.userLogin})
    if(condidate){
        const passRes = bcrypt.compareSync(request.body.userPassword,condidate.password)
        if(passRes&&request.body.userLogin==="admin12345"){
            setCookie(request,response,condidate)
            response.redirect("/admin/gameList")
        }else if (passRes&&request.body.userLogin!=="admin12345"){
            setCookie(request,response,condidate)
            response.redirect("/gameManager/DownloadGames")
        }else{
            response.status(401).json({message:"Пароли не совпадают"})
        }
    }else{
        response.render("register.hbs",{
            isRegister: true,
            errors:["Пользователь с таким логином не найден"]
        });;
    }
}

exports.logout = function (request, response) {
    response.clearCookie("token");
    response.redirect("/")
}

exports.getCookie = (req, res) => {
    console.log('Cookie: ', req.cookies)
    var arr = req.cookies.token.split(".")
    console.log(arr)
    console.log(atob(arr[1]))
    res.send('Get Cookie')
}

setCookie = (req, res,user) => {
    const token = jwt.sign({
        username:user.username,
        userId:user._id
    },"dev-jwt",{expiresIn : 60*60*24})
    res.cookie('token', token)
    console.log('Set Cookie')
}
