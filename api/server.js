import express from 'express';
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import gigRoute from "./routes/gig.route.js";
import orderRoute from "./routes/order.route.js";
import conversationRoute from "./routes/conversation.route.js";
import messageRoute from "./routes/message.route.js";
import path from 'path';
import reviewRoute from "./routes/review.route.js";
import authRoute from "./routes/auth.route.js";
import { connectDB } from './connectDB.js';
import cookieParser from "cookie-parser";
import cors from "cors";
import { fileURLToPath } from "url";

const app = express();
dotenv.config();

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

mongoose.set("strictQuery", true);

// MongoDB connection function
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

// Middleware
app.use(cors({ origin: "https://flint-frontend.onrender.com", credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/gigs", gigRoute);
app.use("/api/orders", orderRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/api/reviews", reviewRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  console.error(`Error: ${errorMessage}`);
  return res.status(errorStatus).json({ error: errorMessage });
});

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  // Serve static files from the frontend directory
  app.use(express.static(path.join(__dirname, "client/dist")));

  // SPA routing: Handle client-side routes
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
  });
}

// Start the server
const PORT = process.env.PORT || 8800;
app.listen(PORT, async () => {
  await connectDB();
  console.log(`Backend server is running on port ${PORT}!`);
});
