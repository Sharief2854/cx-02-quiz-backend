const express = require("express");
const UserModel = require("../models/user");
const { generateAccessToken } = require("../utils/generateToken");
const { TokenExpiredError } = require("jsonwebtoken");
const router=express.Router();

router.get("/",(req,res)=>{
    res.send("auth routes working... ");
});

router.post("/register",async (req,res)=>{
    let body=req.body;
    // validation
    let user = await UserModel.findOne({ email: body.email });
    if(user){
        res.status(409).json({
            message:"already registered"
        })
        return;
    }
    await UserModel.create(body);
    res.send("done!");
});

router.post("/login",async (req,res)=>{
    let body=req.body;
    // validation
    let user=await UserModel.findOne({email:body.email});
    if (!user) {
        res.status(401).json({
            message: "user not found"
        })
        return;
    }

    let token=generateAccessToken(user);
    if(!token){
        // send error
        res.status(400).json({
            message: "problem with token"
        })
        return;
    }

    res.status(200).json({
        message:"login done",
        role:user.role,
        token
    })

});

module.exports=router;

