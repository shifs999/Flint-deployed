import mongoose  from "mongoose";

export const connectDB=async()=>{
   try{
      await mongoose.connect('###')
      console.log('connected to DB')
   }
   catch(error){
       console.log('error connecting DB',error);
   }
}
