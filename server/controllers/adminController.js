import User from "../models/User.js";
import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";

export const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

export const getAllConversations = async (req, res) => {
  const conversations = await Conversation.find().populate("participants", "name email");
  res.json(conversations);
};

export const getAllMessages = async (req, res) => {
  const messages = await Message.find().populate("sender", "name email");
  res.json(messages);
};