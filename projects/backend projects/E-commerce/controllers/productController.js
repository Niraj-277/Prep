const Product=require('../models/product');

//@desc Get all products
//@route Get /api/v1/products
exports.getProduct=async(req , res ,next)=>{
    try{
        const products=await Product.find();
        res.status(200).json({
            success:true,
            count:products.length,
            data:products
        })
    }catch(err){
        next(err);
    }
}

