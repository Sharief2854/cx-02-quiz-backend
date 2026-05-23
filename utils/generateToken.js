
const jwt=require("jsonwebtoken")
function generateAccessToken(user){
    try{
        let token = jwt.sign({ id: user._id, role:user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
        return token;
    }
    catch(err){
        return null;
    }
}




module.exports={generateAccessToken};