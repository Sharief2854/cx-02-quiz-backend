const mongoose = require("mongoose");

let attemptSchema=new mongoose.Schema({
    quiz:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"quiz",
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    duration:{
        type:Number,
        required:true
    },
    progress:{
        type:String,
        required:true,
        enum:["In-Progress","Completed"],
        default:"In-Progress"
    },
    totalQuestions:{
        type:Number,
        required:true
    }
    
},{timestamps:true}
);

let attemptModel = mongoose.model("attempt", attemptSchema);
module.exports = attemptModel;




