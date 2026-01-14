const mongoose=require("mongoose")

const productSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,'please add a product name'], //Validation built in
        unique:true //no two products can have the same name
    },
    price:{
        type:Number,
        required:[true,"please enter the price"],
        min:[0,'price cannot be negative']
    },
    category:{
        type:String,
        default:'General'
    }},{timestamps:true//Automatically adds 'createdAt and updatedAt}
})

module.exports=mongoose.model('Product',productSchema);