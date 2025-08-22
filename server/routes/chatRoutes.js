import express from "express";
import { protect } from "../middleware/auth.js";
import { sendMessage, getConversation } from "../controllers/chatController.js";

const router = express.Router();

router.get("/", protect, getConversation);
router.post("/send", protect, sendMessage);

export default router;
