import express from "express";
import { getMessage, sendMessage } from "../controllers/messagesController";
const router = express.Router();

router.post("/send", sendMessage);
router.get("/get", getMessage) 

export default router;


