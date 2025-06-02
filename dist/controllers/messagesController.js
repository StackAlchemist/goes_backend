"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMessage = exports.getMessage = exports.sendMessage = void 0;
const messagesModel_1 = __importDefault(require("../models/messagesModel"));
const sendMessage = async (req, res) => {
    const { name, email, phone, subject, message } = req.body;
    try {
        const messages = await messagesModel_1.default.create({ name, email, phone, subject, message });
        res.status(201).json(messages);
    }
    catch (error) {
        res.status(500).json({ message: "Error creating contact" });
    }
};
exports.sendMessage = sendMessage;
const getMessage = async (req, res) => {
    try {
        const messages = await messagesModel_1.default.find({});
        res.status(200).json(messages);
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: 'internal server' });
    }
};
exports.getMessage = getMessage;
const deleteMessage = async (req, res) => {
    const id = req.params.id;
    try {
        await messagesModel_1.default.findByIdAndDelete(id);
        res.status(200).json({ message: "Message deleted successfully" });
    }
    catch (error) {
        res.status(400).json({ message: "Error deleting message" });
    }
};
exports.deleteMessage = deleteMessage;
