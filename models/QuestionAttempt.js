const mongoose = require("mongoose");

let questionAttemptSchema=new mongoose.Schema({
    attempt:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"attempt",
        required:true
    },
    question:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"question",
        required:true
    },
    answer:{
        type:String,
        required:true
    },
    isCorrect:{
        type:Boolean,
        required:true
    }
    
},{timestamps:true}
);

let questionAttemptModel = mongoose.model("questionAttempt", questionAttemptSchema);
module.exports = questionAttemptModel;




