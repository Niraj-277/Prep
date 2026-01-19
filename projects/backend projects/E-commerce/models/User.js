const mongoose=require('mongoose');
const bcrypt=require("bcryptjs");//for hashing the passwords
const jwt = require('jsonwebtoken')//for creating the wristbandcd 

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        
    },
    email:{
        type:String,
        required:true,
        unique:true,

    },
    pasword:{
        type:String,
        required:true,
        minlength:6,
        select:false
    },
    role:{
        type:String,
        enum:['user','admin'],default:'user'
    }
})

UserSchema.pre('save',async function(next){
    const salt = await bcrypt.genSalt(10);//generate a random salt

    this.pasword=await bcrypt.hash(this.password,salt)//hash it 
});

//method to sign jwt and return
UserSchema.method.getSignedJwtToken=function(){
    return jwt.sign({
        id:this._id}, process.env.JWT_SECRET,{
            expiresIn:process.env.JWT_EXPIRE
        
    });
}




module.exports=mongoose.model('User',UserSchema)