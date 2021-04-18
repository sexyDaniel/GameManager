var mongoose = require("mongoose");

var UserGameSchema = mongoose.Schema({
    userId: String,
    gameId: String,
    id: String
});
var userGame = mongoose.model("userGame", UserGameSchema);
module.exports = userGame;