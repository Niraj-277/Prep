const express=require('express')
const dotenv=require('dotenv')

dotenv.config();
const connectDb=require('./config/db')
const Product=require("./models/product")
const authRoutes=require('./routes/authRoutes')
//Load config



//connect to database
connectDb();

const app = express();

//1.Middleware

// applying a middleware function to my applictation
app.use(express.json());// express.json helps in parsing the json request body


//database route

app.use('/api/v1/products',require('./routes/productRoutes'));

app.use('/api/v1/auth',authRoutes);



// app.post('/products',async(req,res)=>{
//     try{
//         //we dont need to create an id :mongo does it 

//         const product=await Product.create(req.body);

//         res.status(201).json({
//             success:true,
//             data:product
//         })
//     }catch(error){
//         //if user sends bad data
//         res.status(400).json({success:false,error:error.message});
//     }
// })

// //Get :fetch from mongodb
// app.get('/products',async(req,res)=>{
//     console.log("fetching the products");
//     try{
//         const products=await Product.find();

//         res.status(200).json({
//             success:true,
//             count:products.length,
//             data:products
//         });
//     }catch(error){
//         res.status(500).json({
//             success:false,
//             message:"erro"
//         })
//     }
// })



// //--update route

// app.put('/products/:id',async(req,res)=>{

//     console.log(req.params.id)
//     try{
//         const product = await Product.findByIdAndUpdate(req.params.id,req.body,{
//             new:true,
//             runValidators:true
//         });
//         if(!product){
//             return res.status(404).json({success:false,message:"product not found"})
//         }
//         res.status(200).json({success:true,data:product});
//     }catch(error){
//         res.status(400).json({success:false,error:error.message})
//     }
// })

// app.delete('/products/:id',async(req,res)=>{
//     console.log("ID:", req.params.id);
//     try{
//         const product = await Product.findByIdAndDelete(req.params.id);
        
//         if(!product){
//             return res.status(404).json({
//                 success:false,message:"Product not found"
//             })
//         }
//         res.status(200).json({success:true,message:'product deleted successfully'})
//     }catch(error){
//         res.status(400).json({success:false,error:error.message})
//     }
    
// })

app.use((req,res,next)=>{
    const timestamp =new Date().toISOString();
    const method=req.method;
    const url=req.url;

    console.log(`[${timestamp}]${method} request made to ${url}`);

    //Crucial : Tell express to move to the next function /route;
    next();
})



//3.Start the server(Open the Restaurant doors)
const PORT=3000;
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})
