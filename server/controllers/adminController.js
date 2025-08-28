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

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Prevent deleting self (optional)
    if (req.user._id.toString() === id) {
      return res.status(400).json({ message: "You cannot delete yourself" });
    }

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Optionally delete user conversations and messages
    await Conversation.deleteMany({ participants: id });
    await Message.deleteMany({ sender: id });

    await user.remove();
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};