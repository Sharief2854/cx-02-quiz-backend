const express = require("express");
const QuizModel = require("../models/Quiz");
const QuestionModel = require("../models/Question");
const router=express.Router();

router.get("/allQuizzes",async (req,res)=>{
    let quizes=await QuizModel.find({isPublished:true}).select("-code -isPublished").populate("trainer","name -_id");
    console.log(quizes);
    res.json(quizes);
})


router.post("/verifyQuizCode/:id",async (req,res)=>{
    let code=req.body.code;
    let id=req.params.id;
    // validation
    let quiz=await QuizModel.findById(id);
    if(!quiz){
        res.status(409).json({
            message:"not found"
        })
        return;
    }
    if(quiz.code!=code){
        res.status(409).json({
            message:"wrong code"
        })
        return;
    }

    // get questions
    let questions = await QuestionModel.find({ quiz: quiz._id }).select("question options");
    // console.log(quiz,questions);

    res.json({
        _id:quiz._id,
        name:quiz.name,
        desc:quiz.desc,
        duration:quiz.duration,
        questions
    });

    
    
}); 
module.exports = router;
