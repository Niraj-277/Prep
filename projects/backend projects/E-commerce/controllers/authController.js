const User=require('../models/User')
const ErrorResponse=require('../utils/errorResponse')

//@desc Register a new user

//@route Post /api/v1/auth/register

exports.register = async(req,res,next)=>{
    try{
        const {name,email,password,role}=req.body;

        //1.Create the user in the database
        const user=await User.create({
            name,
            email,
            pasword,
            role
        });

        //2.Create the "wristband(token)"
        //we defined this method in your User model earlier
        const token= user.getSignedJwtToken();

        //3. send the token back to the user
        res.status(200).json({
            success:true,
            token:token
        });
    }catch(err){
        next(err);
    }
}