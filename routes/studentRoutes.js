const express = require("express");
const QuizModel = require("../models/Quiz");
const router=express.Router();

router.get("/allQuizzes",async (req,res)=>{
    let quizes=await QuizModel.find({isPublished:true}).select("-code -isPublished").populate("trainer","name -_id");
    res.json(quizes);
})

module.exports = router;
