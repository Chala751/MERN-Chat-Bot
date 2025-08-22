import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";
import { botReply } from "../utils/bot.js";

export const sendMessage = async (req, res) => {
  try {
    const { conversationId, text } = req.body;
    const conversation = await Conversation.findById(conversationId);

    if (!conversation)
      return res.status(404).json({ message: "Conversation not found" });

    const newMessage = await Message.create({
      conversation: conversationId,
      sender: req.user._id,
      text,
    });

    // Bot auto reply
    const reply = await botReply(text);
    const botMessage = await Message.create({
      conversation: conversationId,
      sender: null, // system/bot
      text: reply,
    });

    res.json({ messages: [newMessage, botMessage] });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};