const express = require("express");
const ejs = require("ejs");
const mongoose = require('mongoose');
const bodyparser = require("body-parser");
const { nextTick } = require("process");

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
;//database connection
mongoose.connect("mongodb://localhost:27017/baua", { useNewUrlParser: true, useUnifiedTopology: true });
;
const schemaa = {
    title: String,
    content: String
}
const Article = mongoose.model("wiki", schemaa);
const skating = new Article({
    title: "SKATING",
    content: "SKATING IS A MODERN SPORT  WHERE PEOPLE USE FUCKING SKATES TO ROLL ON ROAD AND MAKE ROADS CUM FOR MORE"
});
//skating.save();
app.route("/wikis").get((req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    Article.find({}, (err, d) => {
        if (err) { res.send("404"); }
        else { res.send(d) }
    });

}).post((req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    const newArticle = new Article({ title: req.body.title, content: req.body.content });
    console.log("----||----");

    console.log(newArticle);
    console.log("----||----");
    newArticle.save((err, art) => {
        console.log("SAVED -new article-line-37");
    });
    res.send("POSTED");
}).delete((req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    if (req.body.password == "123456") {
        Article.deleteMany({}, (err) => {
            if (!err) {
                res.send("SUCCESFULLY DELETED")
                console.log("NO ERROR _SUCCESSFULLY DELTED ALL FILES");
            }
        })
    }
    else {

        res.send("INCORRECT PASSWORD");
    }
});
// non-root requests
app.route("/wikis/:pram").get(
    (req, res) => {
        res.set('Access-Control-Allow-Origin', '*');
        const path = req.params.pram;
        Article.find({ title: path }, (err, d) => {
            if (err) { res.send(err) }
            else { res.send(d[0]) }
        });

    }
).put(
    (req, res) => {
        res.set('Access-Control-Allow-Origin', '*');
        Article.findOneAndUpdate(
            { title: req.params.pram },
            { title: req.body.title },
            {
                useFindAndModify: true,
                overwrite: true
            }, (err) => {
                if (err) {
                    console.log(err);
                    res.send("ERROR IN UPDATING ThROUGH PUT");
                }
                else { res.send("SUCCESS"); }
            }
        )

    }
).patch(
    (req, res) => 
    {res.set('Access-Control-Allow-Origin', '*');
        Article.findOneAndUpdate({title:req.params.pram},
            { $set:req.body},
            (err)=>{
                (!err)?
                res.send("SUCESS_PATCH"):res.send("ERROR_PATCH");
            }
            );

    }
).delete(
    (req, res) => {
        res.set('Access-Control-Allow-Origin', '*');
        Article.findOneAndDelete({title:req.params.pram},{},(err)=>{
            if(err){
                console.log(err);
                res.send("<h1>Error!</h1>");
            }
            else{
                res.send("<h2>Success</h2>")
            }
        })

    }
);


//ROOT ROUTE

app.get("/", (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
   
    res.render('thanks');
    console.log(res.body);  
});
//server port
let port = process.env.PORT;
if (port == null || prot == undefined) {
    port = 3000;
}
app.listen(port, (err) => {
    if (err) {
        console.log("ERROR IN LISTENING TO PORT");
    }
    else {
        console.log(`LISTENING ON PORT ${port}`);
    }
})