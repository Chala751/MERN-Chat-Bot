import dotenv from "dotenv";
import connectDB from "./config/db.js";
import User from "./models/User.js";

dotenv.config();
connectDB();

const seedBot = async () => {
  try {
    const exists = await User.findOne({ email: "bot@chat.com" });
    if (!exists) {
      await User.create({
        name: "ChatBot",
        email: "bot@chat.com",
        password: "botpassword",
        role: "admin",
      });
      console.log("Bot user created");
    } else {
      console.log("Bot user already exists");
    }
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedBot();
