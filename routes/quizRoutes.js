const express = require("express");
const QuizModel = require("../models/Quiz");
const QuestionModel = require("../models/Question");

const router=express.Router();

// create quiz

router.post("/add",async (req,res)=>{
    let body=req.body;
    body.trainer=req.userId;
    // validate 
    await QuizModel.create(body);
    res.send("done!");
});

// get all quizes

router.get("/all",async (req,res)=>{
    let userId=req.userId;
    let quizes=await QuizModel.find({trainer:userId});
    res.json(quizes);
})

router.get("/:id", async (req, res) => {
    let id = req.params.id;
    let quiz = await QuizModel.findById(id);
    res.json(quiz);
})

// publish/unpublish quiz
router.put("/publish/:id",async (req,res)=>{
    let id=req.params.id;
    // min 10 questions
    let questions=await QuestionModel.find({quiz:id});
    if(questions.length<10){
        res.status(400).send("min 10 qestions required");
        return;
    }
    let quiz=await QuizModel.findById(id);
    quiz.isPublished=req.body.isPublished;
    await quiz.save();
    res.send("done!");
})

module.exports = router;


