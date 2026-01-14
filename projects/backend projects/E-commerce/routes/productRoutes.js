const express=require('express')
const router=express.Router()//Create the router mini app
const Product = require('../models/product');

//use router instead of apps

//!Getting the products

router.get('/',async(req,res)=>{
    try{
        const products= await Product.find();
        res.status(200).json({
            status:'success',
            message:"here are the products",
            count:products.length,
            data:products
        })
    }catch(error){
        res.status(404).json({
            status:'fail',
            error:error.message
        })
    }
    
})

//!posting a product in the database

router.post('/',async(req,res)=>{
    try{
        const product=await Product.create(req.body);

        res.status(200).json({
            status:'success',
            message:"product got inserted",
            data:product
        })
    }catch(error){
        res.status(404).json({
            status:'failure',
            error:error.message
        })
    }
})

//! update the product Route

router.put('/:id',async(req,res)=>{
    try{
        const product=await Product.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true
        });
        if(!product){
            return res.status(404).json({success:false,message:"producct not found"})
        }
        res.status(200).json({success:true,data:product})
    }catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }

})

//! Delete a product Route

router.delete('/:id',async(req,res)=>{
    try{
        const product=await Product.findByIdAndDelete(req.params.id);

        if(!product){
            return res.status(404).json({
                status:'fail',
                message:'Product not found '
            })
        }
         res.status(200).json({
                status:'success',
                message:'Product Delete' })
    }catch(error){
        res.status(400).json({
                status:'false',
                message:'Product not found ',
            error:error.message});
    }
})

module.exports=router;