const mongoose = require("mongoose");
const Cat = mongoose.model("Cat");

module.exports = {
    show: function(req, res){
            Cat.find({}, function(err, cats){
            if(err) {
                console.log("something went wrong", err);
            }else {
                console.log(cats)
            
            res.render("index", {cats:cats});
            }
        })
    },
    newCat: function(req, res){
        res.render("new")
    }, 
    showCat: function(req, res){
            Cat.findOne({_id:req.params.id}, function(err, cat){
            if(err){
                console.log("something went wrong");
            }
            console.log(cat);

            res.render("this_cat", {cat:cat});
         })
    },
    createCat: (req, res)=>{
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
        },
    editCat: (req, res)=>{
            Cat.findOne({_id:req.params.id}, function(err, cat){
                if(err){
                return console.log("something went wrong");
            }
            console.log(cat)
            res.render("edit", {cat: cat});
        })
    },
    updateCat: (req, res)=>{
            let body = req.body
            Cat.findOneAndUpdate({_id:req.params.id}, body, function(err){
                if(err){
                    return console.log("something went wrong");
                }
                console.log(cat);
                res.redirect("/");
            })
    },
    destroyCat: (req, res) =>{
        //destory current cat data
        Cat.findOneAndRemove({_id:req.params.id}, function(err){
            if(err){
                return console.log("something went wrong");
            }
            res.redirect("/");
        })
    }
}