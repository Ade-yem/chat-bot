import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import ChatController from "../controllers/chatController.js";
import { validate, validateChat } from "../utils/validators.js";

const chatRoutes = Router();
chatRoutes.post("/new", validate(validateChat), verifyToken, ChatController.generateChat)
chatRoutes.get("/get_chats", verifyToken, ChatController.getChats)
chatRoutes.delete("/delete_chats", verifyToken, ChatController.deleteChats)
export default chatRoutes;