import express from "express";
import { adminOnly, protect } from "../middleware/auth.js";
import { getAllUsers, getAllConversations, getAllMessages, deleteUser } from "../controllers/adminController.js";

const router = express.Router();

router.get("/users", protect, adminOnly, getAllUsers);
router.get("/conversations", protect, adminOnly, getAllConversations);
router.get("/messages", protect, adminOnly, getAllMessages);
router.delete("/users/:id", protect, adminOnly, deleteUser)

export default router;
