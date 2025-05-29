import express from "express";
import { deleteMessage, getMessage, sendMessage } from "../controllers/messagesController";
const router = express.Router();

router.post("/send", sendMessage);
router.get("/get", getMessage) 
router.delete("/delete/:id", deleteMessage)

export default router;


