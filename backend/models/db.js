import mongoose from 'mongoose'

export const connectDB = async ()=>{
   try{
     const db = await mongoose.connect(process.env.MONGO_URl);
     console.log("Connection Successful");  
   }catch(error){
     console.log('Error in DB connection',error)
   }
}
  