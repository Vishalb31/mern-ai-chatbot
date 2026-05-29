import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";

dotenv.config();

// MongoDB Connection
connectDB();

const app = express();


// Middleware
app.use(
  cors({
    origin:
      "https://mern-ai-chatbot-plum.vercel.app",
    credentials: true,
  })
);

app.use(express.json());


// Routes
app.use("/api/auth", authRoutes);

app.use("/api/chat", chatRoutes);


// Groq Config
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});


// Home Route
app.get("/", (req, res) => {
  res.send("API Running...");
});


// Basic Chat Route
app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const response =
      await groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: message,
          },
        ],

        model: "llama-3.1-8b-instant",
      });

    res.json({
      reply:
        response.choices[0].message.content,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Something went wrong",
    });
  }
});


// Server Start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});