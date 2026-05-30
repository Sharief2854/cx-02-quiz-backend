const express = require("express");
const QuestionModel = require("../models/Question");

const router=express.Router();

// to create question
router.post("/add",async (req,res)=>{
    let body=req.body;
    body.trainer=req.userId;
    // validate
    await QuestionModel.create(body);
    res.send("done!");
})

// get all questions based on quiz id
router.get("/all/:id",async (req,res)=>{
    let quizId=req.params.id;
    let questions=await QuestionModel.find({quiz:quizId});
    res.json(questions);
})



module.exports = router;
