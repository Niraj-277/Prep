const Product=require('../models/product');

//@desc Get all products
//@route Get /api/v1/products
exports.getProducts=async(req , res ,next)=>{
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


//@desc Update product 
//@route PUT /api/v1/products/:id
exports.updateProduct =async(req,res,next)=>{
    try{
        const product = await Product.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true
        });

        if(!product){
            return res.status(404).json({success:false,message:"no prodct found"});
        }

        res.status(200).json({success:true,data:product})
    }catch(err){
        next(err);
        }
}


//@dest Create a product 
//@route POST /api/v1/products/

exports.createProduct=async(req,res,next)=>{
    try{
        const product = await Product.create(req.body);

        res.status(201).json({
            success:true,
            data:product 
        });
    }catch(err){
        next(err);
    }
}


exports.deleteProduct=async(req,res,next)=>{
    try{
        const product =await Product.findByIdAndDelete(req.params.id,req.body,{
            new:true,
            runValidators:true
        });

        if(!product){
            return res.status(404).json({
                succes:false,
                message:'product not found'
            })
        }
        res.status(200).json({
            success:true,
            message:'Product deleted'
        });
    }catch(err){
        next(err)    
    }
}