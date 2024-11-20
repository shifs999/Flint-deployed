import mongoose  from "mongoose";

export const connectDB=async()=>{
   try{
      await mongoose.connect('mongodb+srv://saizen777999:oSRyeOij8iV77RS6@cluster0.bxfr6.mongodb.net/Flint?retryWrites=true&w=majority&appName=Cluster0')
      console.log('connected to DB')
   }
   catch(error){
       console.log('error connecting DB',error);
   }
}