"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMessage = exports.getMessage = exports.sendMessage = void 0;
const messagesModel_1 = __importDefault(require("../models/messagesModel"));
const sendMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, phone, subject, message } = req.body;
    try {
        const messages = yield messagesModel_1.default.create({ name, email, phone, subject, message });
        res.status(201).json(messages);
    }
    catch (error) {
        res.status(500).json({ message: "Error creating contact" });
    }
});
exports.sendMessage = sendMessage;
const getMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const messages = yield messagesModel_1.default.find({});
        res.status(200).json(messages);
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: 'internal server' });
    }
});
exports.getMessage = getMessage;
const deleteMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        yield messagesModel_1.default.findByIdAndDelete(id);
        res.status(200).json({ message: "Message deleted successfully" });
    }
    catch (error) {
        res.status(400).json({ message: "Error deleting message" });
    }
});
exports.deleteMessage = deleteMessage;
