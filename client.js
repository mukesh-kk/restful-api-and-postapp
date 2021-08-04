const express=require("express");

const bodyparser=require("body-parser");
const ejs=require("ejs");
const client=express();
client.set("view engine","ejs");
client.use(express.urlencoded({extended:true}));
client.use(express.json());
client.use(express.static("public"));


client.get("/",(req,res)=>{
res.render("index");
});






//ports
let port=process.on.PORT;
if(port==null||port==undefined){
    port=4000;
}
client.listen(port,(err)=>{
    if(!err) console.log(`LISTENING CLIENTS ON PORT ${port}`);
});