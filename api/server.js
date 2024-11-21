import express from 'express'
import mongoose from "mongoose"
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import gigRoute from "./routes/gig.route.js";
import orderRoute from "./routes/order.route.js";
import conversationRoute from "./routes/conversation.route.js";
import messageRoute from "./routes/message.route.js";
import reviewRoute from "./routes/review.route.js";
import authRoute from "./routes/auth.route.js";
import { connectDB } from './connectDB.js';
import cookieParser from "cookie-parser";
import cors from "cors";

const app=express();
dotenv.config();
mongoose.set("strictQuery", true);

const connect = async () => {
    try {
      await mongoose.connect(process.env.MONGO);
      console.log("Connected to mongoDB!");
    } catch (error) {
      console.log(error);
    }
  };
  
  app.use(cors({ origin: "https://flint-frontend.onrender.com", credentials: true }));
  app.use(express.json());
  app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/gigs", gigRoute);
app.use("/api/orders", orderRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/api/reviews", reviewRoute);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
  
    return res.status(errorStatus).send(errorMessage);
  });
if(process.env.NODE_ENV==="production"){

// Serve static files from the frontend
app.use(express.static(path.join(__dirname, "frontend/dist")));

// Handle client-side routing for SPA
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});
}
app.listen(8800,()=>{
    connectDB();
    console.log('backend server is running !')
})
