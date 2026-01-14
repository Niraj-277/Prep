const mongoose=require('mongoose');

//we use an async function because connecting takes time 

const connectDb=async()=>{
    try{
        const conn =await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDb connected:${conn.connection.host}`)

    }catch(error){
        console.error(`Error ${error.message}`);
        process.exit(1);//Stop the server if Db fails . A server without a db is useless
    }
};

module.exports=connectDb;
