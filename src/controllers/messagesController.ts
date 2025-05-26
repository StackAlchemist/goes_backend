import Messages from "../models/messagesModel";
import { Request, Response } from "express";

export const sendMessage = async (req: Request, res: Response) => {
    const { name, email, phone, subject, message } = req.body;
    
    try {
        const messages = await Messages.create({ name, email, phone, subject, message });
        res.status(201).json(messages);
    } catch (error) {
        res.status(500).json({ message: "Error creating contact" });
    }
}

