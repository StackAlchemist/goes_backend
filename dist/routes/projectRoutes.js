"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const projectsController_1 = require("../controllers/projectsController");
const uploadImage_1 = __importDefault(require("../middlewares/uploadImage"));
const router = (0, express_1.Router)();
router.post("/create", uploadImage_1.default.array("images"), (req, res) => {
    (0, projectsController_1.createProject)(req, res);
});
router.get("/get", (req, res) => {
    (0, projectsController_1.getProjects)(req, res);
});
router.get("/get/:id", (req, res) => {
    (0, projectsController_1.getProjectById)(req, res);
});
router.patch("/edit/:id", (req, res) => {
    (0, projectsController_1.editProject)(req, res);
});
router.delete("/delete/:id", (req, res) => {
    (0, projectsController_1.deleteProject)(req, res);
});
exports.default = router;
