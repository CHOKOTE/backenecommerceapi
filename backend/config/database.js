import mongoose from "mongoose";
 


const connectDB = async () =>{
     try{
        
        const con = await mongoose.connect(process.env.MONGO_URI);
        if(con) console.log('The server is connecting to mongodb');
     }catch(err){
        console.log(err);
        process.exit();
     }
}

export default connectDB;