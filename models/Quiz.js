const mongoose = require("mongoose");

let quizSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    code:{
        type:String,
        required:true,
        unique:true
    },
    trainer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    }
    
},{timestamps:true}
);

let QuizModel = mongoose.model("quiz", quizSchema);
module.exports = QuizModel;




