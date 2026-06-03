const express = require("express");
const QuizModel = require("../models/Quiz");
const QuestionModel = require("../models/Question");
const attemptModel = require("../models/Attempt");
const questionAttemptModel = require("../models/QuestionAttempt");
const router=express.Router();

router.get("/allQuizzes",async (req,res)=>{
    let quizes=await QuizModel.find({isPublished:true}).select("-code -isPublished").populate("trainer","name -_id");
    console.log(quizes);
    res.json(quizes);
})

//create attempt and verufy code
router.post("/verifyQuizCode/:id",async (req,res)=>{
    
    let id=req.params.id;
    // validation
    let quiz=await QuizModel.findById(id);
    if(!quiz){
        res.status(409).json({
            message:"not found"
        })
        return;
    }
    // get questions
    let questions = await QuestionModel.find({ quiz: quiz._id }).select("question options");

    let attempt = await attemptModel.findOne({ quiz: quiz._id, user: req.userId });
    if (attempt) {
        console.log(attempt);
        let date = new Date();
        console.log();
        res.json({
            _id: quiz._id,
            name: quiz.name,
            desc: quiz.desc,
            // remaining duration
            duration: quiz.duration - ((date - attempt.createdAt) / (1000 * 60)),
            questions,
            attemptId: attempt._id
        });
        return;
    }

    let code = req.body.code;

    if(quiz.code!=code){
        res.status(409).json({
            message:"wrong code"
        })
        return;
    }
 
   

   

    // create attempt
    attempt=await attemptModel.create({
        quiz:quiz._id,
        user:req.userId,
        duration:quiz.duration,
        totalQuestions:questions.length
    })

    res.json({
        _id:quiz._id,
        name:quiz.name,
        desc:quiz.desc,
        duration:quiz.duration,
        questions,
        attemptId:attempt._id
    });

    
    
}); 

// store quesstion attempt
router.post("/storeQuestionAttempt/:attemptId",async (req,res)=>{
    let attemptId=req.params.attemptId;
    let questionId=req.body.questionId;
    let answer=req.body.answer;
    // validate
    let attempt=await questionAttemptModel.findOne({attempt:attemptId,question:questionId});

    // check answer
    let question = await QuestionModel.findById(questionId);
    let isCorrect = false;
    if (question.answer == answer) {
        isCorrect = true;
    }

    if(attempt){
        attempt.answer=answer;
        attempt.isCorrect=isCorrect;
        await attempt.save();
        res.send("done!");
        return;
    }

    
    //store data in question attempt model
    await questionAttemptModel.create({
        attempt:attemptId,
        question: questionId,
        answer,
        isCorrect
    })
    res.send("done!");

});


// get attempted data
router.get("/getAttemptDetails/:attemptId",async (req,res)=>{
    let attemptId=req.params.attemptId;
    // validate
    let questions=await questionAttemptModel.find({attempt:attemptId}).select("question answer");
    console.log(questions,"hhhh");
    res.json(questions);
});



module.exports = router;
