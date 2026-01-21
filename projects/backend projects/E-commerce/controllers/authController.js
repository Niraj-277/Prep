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
            password,
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

// @desc Login user
//@route POST /api/v1/auth/login

exports.login =async(req,res,next)=>{
    try{
        const {email,password}=req.body;
        
        //1. Validate email & password exists
        if(!email || !password){
            return next(new ErrorResponse('Please provide an email and password',400))
        }

        //2.Check for user
        //we explicitly ask for the password because we set {select :false }in the model
        const user = await User.findOne({email}).select('+password');

        if(!user){
            return next(new ErrorResponse('invalid credentials',401))
        }
         
        //3.Check if Password matches
        //we use the method we just wrote in the model 
        const isMatch=await user.matchPassword(password);

        if(!isMatch){
            return next(new ErrorResponse('Invalid credentials',401))
        }

        //4. Send Token
        const token=user.getSignedJwtToken();

        res.status(200).json({
            success:true,
            token:token
        })
    }catch(err){
        next(err)
    };
}