import express from "express";
import dotenv from "dotenv";
import Groq from "groq-sdk";

import Chat from "../models/Chat.js";
import protect from "../middleware/authMiddleware.js";

dotenv.config();

const router = express.Router();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});


// SEND MESSAGE
router.post("/", protect, async (req, res) => {
  try {
    const { message } = req.body;

    // Save user message
    await Chat.create({
      userId: req.user._id,
      role: "user",
      text: message,
    });

    // AI response
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

    const aiReply =
      response.choices[0].message.content;

    // Save AI response
    await Chat.create({
      userId: req.user._id,
      role: "ai",
      text: aiReply,
    });

    res.json({
      reply: aiReply,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});


// GET CHAT HISTORY
router.get("/", protect, async (req, res) => {
  try {
    const chats = await Chat.find({
      userId: req.user._id,
    });

    res.json(chats);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

export default router;