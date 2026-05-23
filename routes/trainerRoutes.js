const express = require('express');
const UserModel = require('../models/user');

const router=express.Router();

// get all trainers

router.get("/",async (req,res)=>{
    let trainers=await UserModel.find({role:"trainer"}).select("-password -role");
    res.json({
        trainers
    })
});

// add trainer
router.post("/add",async (req,res)=>{
    let body=req.body;
    // validation
    let user = await UserModel.findOne({ email: body.email });
    if(user){
        res.status(409).json({
            message:"already registered"
        })
        return;
    }
    body.role="trainer";
    await UserModel.create(body);
    res.send("done!");
});

// update trainer
router.put("/update/:id",async (req,res)=>{
    let body=req.body;
    let id=req.params.id;
    // validation
    let user = await UserModel.findOne({ _id: id });
    if(!user){
        res.status(409).json({
            message:"not found"
        })
        return;
    }
    user.name=body.name;
    user.email=body.email;
    await user.save();
    res.send("done!");
});



// delete trainer based on id 
router.delete("/delete/:id",async (req,res)=>{
    let id=req.params.id;
    // validation
    let user = await UserModel.findByIdAndDelete(id);
    if(!user){
        res.status(409).json({
            message:"not found"
        })
        return;
    }
    res.send("done!");
});

// get trainer by id
router.get("/:id",async (req,res)=>{
    let id=req.params.id;
    // validation
    let trainer = await UserModel.findById(id);
    if(!trainer){
        res.status(409).json({
            message:"not found"
        })
        return;
    }
    res.json({
        trainer
    })
});

module.exports=router;