const mongoose = require("mongoose");

let resultSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    quiz:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"quiz",
        required:true
    }, 
    attempt:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"attempt",
        required:true
    },
    score:{
        type:Number,
        required:true
    }
    
},{timestamps:true}
);

let resultModel = mongoose.model("result", resultSchema);
module.exports = resultModel;




