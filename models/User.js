const mongoose = require("mongoose");

let userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"student",
        enum:["student","trainer","admin"]
    },
    isVerified:{
        type:Boolean,
        default:false
    }
},{timestamps:true}
);

let UserModel = mongoose.model("user", userSchema);
module.exports=UserModel;




