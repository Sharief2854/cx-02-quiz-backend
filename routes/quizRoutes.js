const express = require("express");
const QuizModel = require("../models/Quiz");

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

module.exports = router;


