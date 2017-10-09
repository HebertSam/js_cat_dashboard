const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

const path = require("path");
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/cat_dashboard");

let CatsSchema = new mongoose.Schema({
    name: {type:String, required:true, minlength:2},
    age: {type:Number, required:true, min:1, max:200},
    color: {type:String, required:true, minlength:2}
}, {timestamps:true})
mongoose.model("Cat", CatsSchema);
let Cat = mongoose.model("Cat");


app.get("/", function(req, res){
    Cat.find({}, function(err, cats){
        if(err) {
            console.log("something went wrong", err);
        }else {
            console.log(cats)
        
        res.render("index", {cats:cats});
        }
    }) 
})
app.get("/cats/new", (req, res) =>{
    res.render("new")
})

app.get("/cats/:id", (req, res) =>{
    //query for specific cat
    Cat.findOne({_id:req.params.id}, function(err, cat){
        if(err){
            console.log("something went wrong");
        }
        console.log(cat);

    res.render("this_cat", {cat:cat});
    })
})


app.post("/cats", (req, res)=>{
    let body = req.body;
    console.log(body);
    let cat = new Cat(body)
    cat.save(function(err){
        if(err){
            return console.log("something went wrong", err);
        }
        console.log("success");
        res.redirect("/")
    })
})

app.get("/cats/edit/:id", (req, res)=>{
    Cat.findOne({_id:req.params.id}, function(err, cat){
        if(err){
            return console.log("something went wrong");
        }
        console.log(cat)
        res.render("edit", {cat: cat});
    })
})

// app.get("/cats/destroy/:id", (res, req) =>{
//     //destory current cat data
//     Cat.findOneAndRemove({_id:req.params.id}, function(err){
//         if(err){
//             return console.log("something went wrong");
//         }
//         res.redirect("/");
//     })
// })

app.post("/cats/:id", (req, res)=>{
    let body = req.body
    Cat.findOneAndUpdate({_id:req.params.id}, body, function(err){
        if(err){
            return console.log("something went wrong");
        }
        console.log(cat);
        res.redirect("/");
    })
})

app.get("/cats/destroy/:id", (req, res) =>{
    //destory current cat data
    Cat.findOneAndRemove({_id:req.params.id}, function(err){
        if(err){
            return console.log("something went wrong");
        }
        res.redirect("/");
    })
})
app.listen(8000, ()=>{
    console.log("listening on port 8000");
})