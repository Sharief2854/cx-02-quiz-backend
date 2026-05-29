const mongoose = require("mongoose");

let questionSchema=new mongoose.Schema({
    question:{
        type:String,
        required:true
    },
    options:{
        type:Array,
        required:true
    },
    answer:{
        type:String,
        required:true
    },
    quiz:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"quiz",
        required:true
    },
    trainer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    }
    
},{timestamps:true}
);

let QuestionModel = mongoose.model("question", questionSchema);
module.exports = QuestionModel;




