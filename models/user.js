var mongoose = require("mongoose");

var UserSchema = mongoose.Schema({
    username: String,
    id: String,
    password: String,
    firtsName:String,
    lastName: String,
    email:String
});
var User = mongoose.model("User", UserSchema);
module.exports = User;