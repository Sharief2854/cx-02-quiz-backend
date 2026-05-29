require('dotenv').config();

const express=require("express");
const connectDB = require('./config/db');
const authRoutes=require("./routes/authRoutes");
// cors
const cors=require("cors");
const trainerRoutes=require("./routes/trainerRoutes");
const isAdmin = require('./middlewares/adminAuth');
const quizRoutes=require("./routes/quizRoutes");
const isTrainer = require('./middlewares/trainerAuth');
const questionRoutes=require("./routes/questionRoutes");


const app=express();

connectDB();// connect to database (atlas)


// middlewares
app.use(cors());
app.use(express.json());

app.use("/auth",authRoutes);
app.use("/trainer", isAdmin, trainerRoutes);
app.use("/quiz", isTrainer,quizRoutes);
app.use("/question",isTrainer,questionRoutes);


app.get("/",(req,res)=>{
    res.send("server working....")
});

app.listen(process.env.PORT,()=>{
    console.log("server is running in the port " + process.env.PORT)
})
