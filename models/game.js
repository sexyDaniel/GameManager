var mongoose = require("mongoose");

var GameSchema = mongoose.Schema({
    gameName: String,
    id: String,
    developer:String,
    publisher:String,
    publicationDate:String,
    photoLink:String,
    infoPhotoLink:String,
    gameDescription : String,
    os: String,
    processor: String,
    RAMmemory:String,
    diskSpace:String,
    videocard:String
});
var Game = mongoose.model("Game", GameSchema);
module.exports = Game;