const express = require("express");
const app = express();
const registerRouter = require("./routes/registerRoute.js");
const adminRouter = require("./routes/adminRoute.js")
const mongoose = require("mongoose");
const expressHbs = require("express-handlebars");
const hbs = require("hbs");

app.engine("hbs", expressHbs(
    {
        layoutsDir: "views/layouts", 
        defaultLayout: "layout",
        extname: "hbs",
        helpers:{setLinks: function(links,activeIndex) {
            var result="";
            for(var i=0; i<links.length; i++){
                if(i===activeIndex){
                    result +=`<li><a class = 'active' href='${links[i].link}'>${links[i].text}</a></li>`;
                }else{
                    result +=`<li><a href='${links[i].link}'>${links[i].text}</a></li>`;
                }
            }
            return new hbs.SafeString(result);
        }}
    }))


app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");
app.use(express.static(__dirname ));

app.use("/",registerRouter)
app.use("/admin",adminRouter)

mongoose.connect('mongodb://localhost/GameManager', {useNewUrlParser: true,useUnifiedTopology: true })
 
app.use(function (req, res, next) {
    res.status(404).send("Not Found")
});

app.listen(3000);