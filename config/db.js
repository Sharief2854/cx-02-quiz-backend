// database 
const mongoose = require("mongoose");

async function connectDB(){
    try{
        await mongoose.connect(process.env.DATA_BASE_URL);
        console.log("database connected");
    }
    catch(err){
        console.log(err);
        console.log("there is error in connecting database")
    }
}

module.exports=connectDB;