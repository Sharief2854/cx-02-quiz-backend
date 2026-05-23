const jwt=require("jsonwebtoken");

function isAdmin(req,res,next){
    let head=req.headers.authorization;
    let token=head.split(" ")[1]
    let decoded=jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role != "admin"){
        res.status(401).json({
            message:"inavlid token"
        })
        return;
    }

    // check databse
    
    next();

}
module.exports=isAdmin;