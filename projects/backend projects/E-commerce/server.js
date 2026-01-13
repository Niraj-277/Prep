const express=require('express')

const app = express();

//1.Middleware

// applying a middleware function to my applictation
app.use(express.json());// express.json helps in parsing the json request body

//fake database

const products=[{id:1,name:'laptop',price:1000},
    {id:2,name:"phone",price:500}
];

companies=['hcl','tcs','Accenture','infosys']

//2.Route    // the request contains everything about the user (their ip address , what browser they use , what data they sent);
app.get('/products',(req,res)=>{
    console.log("Customer asked for products");

    res.json({
       status:'success',
       message:"Menu fetched",
       data:products,    })
})

//Creating a post route
app.post('/products',(req,res)=>{
    console.log("Receiving new product data;",req.body);

    //----step 1:Destructuring ---

    //Extract name and price from the user's data(The body)
    const{name,price}=req.body;

    //---step 2:Validation
    //if they didnt send a name and didnt send a price --reject is!!
    if(!name || !price ){
        return res.status(400).json({
            error:"Bad request"
        })
    }

    //--step 3 Create the resource

    const newProduct={
        id:products.length+1,//simple id generator
        name:name,
        price:price,
    };
    //-- save to our database
    products.push(newProduct);

    //--step 4: Send the response
    // 201 means :created(200 is just "ok")
    res.status(201).json({
        message:"product added successfully",
        product :newProduct
    })
})


app.get('/hello',(req,res)=>{
            console.log("getting the companies");

        res.status(201).json({
            status:"success",
            message:'hello niraj best of luck for learning nodejs',
            data:companies,

        })
    })

//3.Start the server(Open the Restaurant doors)
const PORT=3000;
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})
