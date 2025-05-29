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
exports.deleteProject = exports.editProject = exports.getProjectById = exports.getProjects = exports.createProject = void 0;
const projectsModel_1 = __importDefault(require("../models/projectsModel"));
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const stream_1 = require("stream");
const createProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('project creation request was sent');
    try {
        const { title, description, status, location } = req.body;
        const files = req.files;
        if (!files || files.length === 0) {
            return res.status(400).json({ message: "At least one image is required" });
        }
        // Upload each image to Cloudinary
        const uploadPromises = files.map((file) => {
            const stream = stream_1.Readable.from(file.buffer);
            return new Promise((resolve, reject) => {
                const uploadStream = cloudinary_1.default.uploader.upload_stream({
                    folder: "projects",
                    resource_type: "image",
                    use_filename: true,
                    unique_filename: false,
                }, (err, result) => {
                    if (err)
                        return reject(err);
                    resolve(result === null || result === void 0 ? void 0 : result.secure_url);
                });
                stream.pipe(uploadStream);
            });
        });
        const imageUrls = yield Promise.all(uploadPromises);
        yield projectsModel_1.default.create({ title, description, images: imageUrls, status, location });
        res.status(201).json({
            message: "Project created successfully",
            data: {
                title,
                description,
                images: imageUrls,
                status,
                location
            },
        });
    }
    catch (error) {
        console.error("Error creating project:");
        res.status(500).json({ message: "Failed to create project" });
    }
});
exports.createProject = createProject;
const getProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projects = yield projectsModel_1.default.find({});
        res.status(200).json(projects);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'internal server error' });
    }
});
exports.getProjects = getProjects;
const getProjectById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projectId = req.params.id;
        const project = yield projectsModel_1.default.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        res.status(200).json(project);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getProjectById = getProjectById;
// src/controllers/projectsController.ts/ adjust path as needed
const editProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projectId = req.params.id;
        const { title, description, status, location } = req.body;
        const updatedProject = yield projectsModel_1.default.findByIdAndUpdate(projectId, { title, description, status, location }, { new: true });
        if (!updatedProject) {
            return res.status(404).json({ message: "Project not found" });
        }
        res.status(200).json(updatedProject);
    }
    catch (error) {
        console.error("Error editing project:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.editProject = editProject;
const deleteProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projectId = req.params.id;
        yield projectsModel_1.default.findByIdAndDelete(projectId);
        res.status(200).json({ message: "Project deleted successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.deleteProject = deleteProject;
