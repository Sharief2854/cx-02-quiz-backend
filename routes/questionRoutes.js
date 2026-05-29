const express = require("express");
const QuestionModel = require("../models/Question");

const router=express.Router();

router.post("/add",async (req,res)=>{
    let body=req.body;
    body.trainer=req.userId;
    // validate
    await QuestionModel.create(body);
    res.send("done!");
})

router.get("/all/:id",async (req,res)=>{
    let quizId=req.params.id;
    let questions=await QuestionModel.find({quiz:quizId});
    res.json(questions);
})



module.exports = router;
