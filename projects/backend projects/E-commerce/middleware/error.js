const ErrorResponse = require("../utils/errorResponse");

const errorHandler=(err,req,res,next)=>{
    //Log the full error to the console for the developer
    console.log(err.stack);
    //Set the default error properties
    let error ={ ...err };
    error.message=err.message;

    //1% detail : Catching specific mongodb errors
    //Mongoose bad ObjectId(e.g. searching for '123' instead )
    if(err.name==='castError'){
        const message=`Resource not found with id of ${err.value}`;
        error=new ErrorResponse(message,404);
    }
    //Mongoose duplicate key(e.g adding two products with the same name)
    if (err.code===11000){
        const message='Duplicate field value entered ';
        error=new ErrorResponse(message,400);
    }

    res.status (error.statusCode || 500).json({
        success:false,
        error:error.message || 'server Error'
    });
}

module.exports =errorHandler;