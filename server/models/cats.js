const mongoose = require("mongoose");

let CatsSchema = new mongoose.Schema({
    name: {type:String, required:true, minlength:2},
    age: {type:Number, required:true, min:1, max:200},
    color: {type:String, required:true, minlength:2}
}, {timestamps:true})
mongoose.model("Cat", CatsSchema);
let Cat = mongoose.model("Cat");