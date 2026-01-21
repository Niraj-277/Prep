const jwt=require('jsonwebtoken')
const User=require('../models/User');
const ErrorResponse=require('../utils/errorResponse')

exports.protect=async(req,res,next)=>{
    let token;

    //Check if the authorization header exists
    //format "Bearer eyahdjhjshd"
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        //Extract the token (remove the word Bearer)
        token=req.headers.authorization.split(' ')[1];
    }

    //2. if no token ,kick them out 
    if (!token){
        return next(new ErrorResponse('not authorised to access this route',401));
    }
    try{
        //3. Verify the token(check the signature)
        const decoded=jwt.verify(token,process.env.JWT_SECRET);

        //FIND THE USER Inthe db and attach the req.user

        req.user=await User.findById(decoded.id);

        next();
    }catch(err){
        return next(new ErrorResponse('not authorized to access',401));
    }
}

//Grant acess to specific roles

exports.authorize=(...roles)=>{
    return(req,res,next)=>{
        //req.user is available because 'protect' ran first 
        if(!roles.includes(req.user.role)){
            return next(new ErrorResponse(
                `User role '${req.user.role}is not authorised to access this route`,403
            ))
        }
        next();
    }
}