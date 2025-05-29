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

export const getMessage = async (req: Request, res: Response) =>{
    try {
        const messages = await Messages.find({})
        res.status(200).json(messages)
    } catch (error) {
        console.log(error)
        res.status(400).json({message: 'internal server'})
    }
}

export const deleteMessage = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        await Messages.findByIdAndDelete(id);
        res.status(200).json({ message: "Message deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: "Error deleting message" });
    }
}



