"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const applicationsController_1 = require("../controllers/applicationsController");
const multer_1 = __importDefault(require("../middlewares/multer"));
const router = (0, express_1.Router)();
router.post("/send", multer_1.default.single("document"), applicationsController_1.createApplication);
router.get("/get", applicationsController_1.getApplications);
router.get("/get/:id", applicationsController_1.getApplicationById);
exports.default = router;
