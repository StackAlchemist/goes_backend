"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const messagesController_1 = require("../controllers/messagesController");
const router = express_1.default.Router();
router.post("/send", messagesController_1.sendMessage);
router.get("/get", messagesController_1.getMessage);
router.delete("/delete/:id", messagesController_1.deleteMessage);
exports.default = router;
