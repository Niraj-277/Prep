const express = require('express');
const router=express.Router();
const {register,login}=require('../controllers/authController')

//when they POST  to /register , run the register function
router.post('/register',register);
router.post('/login',login)

module.exports=router;