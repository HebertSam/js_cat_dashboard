const mongoose = require("mongoose");
const Cat = mongoose.model("Cat");
const cats = require("../controllers/cats.js");

module.exports = function(app){
    app.get("/", function(req, res){
        cats.show(req, res)
    })
    app.get("/cats/new", function(req, res){
        cats.newCat(req, res)
    })
    app.get("/cats/:id", function(req, res){
        cats.showCat(req, res)
    })
    app.post("/cats", function(req, res){
        cats.createCat(req, res)
    })
    app.get("/cats/edit/:id", function(req, res){
        cats.editCat(req, res)
    })
    app.post("/cats/:id", function(req, res){
        cats.updateCat(req, res)
    })
    
    app.get("/cats/destroy/:id", function(req, res){
        cats.destroyCat(req, res)
    })
}