const express=require('express')
const dotenv=require('dotenv')
const connectDb=require('./config/db')
const Product=require("./models/product")

//Load config

dotenv.config();

//connect to database
connectDb();

const app = express();

//1.Middleware

// applying a middleware function to my applictation
app.use(express.json());// express.json helps in parsing the json request body


//database route
app.post('/products',async(req,res)=>{
    try{
        //we dont need to create an id :mongo does it 

        const product=await Product.create(req.body);

        res.status(201).json({
            success:true,
            data:product
        })
    }catch(error){
        //if user sends bad data
        res.status(400).json({success:false,error:error.message});
    }
})

//Get :fetch from mongodb
app.get('products',async(req,res)=>{
    try{
        const products=await Product.find();

        res.status(200).json({
            success:true,
            count:products.length,
            data:products
        });
    }catch(error){
        res.status(500).json({
            success:false,
            error:error.message
        })
    }
})



// app.get('/hello',(req,res)=>{
//             console.log("getting the companies");

//         res.status(201).json({
//             status:"success",
//             message:'hello niraj best of luck for learning nodejs',
//             data:companies,

//         })
//     })


// app.post('/companies',(req,res)=>{

//     console.log("user is adding the company")
//     //destructuring
//     const{name}=req.body
//     //validation
//     if(!name){
//         res.status(400).json({
//             message:"bad request name not present"
//         })
//     }
//     //pushing in the array
//     companies.push(name);

//     //send the response
//     res.status(201).json({
//         status:"success",
//         message:"company added successfully",
//         data:companies
//     })
// })



//3.Start the server(Open the Restaurant doors)
const PORT=3000;
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})
