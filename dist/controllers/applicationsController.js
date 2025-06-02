"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApplicationById = exports.getApplications = exports.createApplication = void 0;
const applicationsModel_1 = __importDefault(require("../models/applicationsModel"));
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const stream_1 = require("stream");
const createApplication = async (req, res) => {
    try {
        const { firstName, lastName, institution, email, type } = req.body;
        const document = req.file;
        if (!document) {
            throw new Error("Document is required");
        }
        const bufferStream = stream_1.Readable.from(document.buffer);
        const result = await new Promise((resolve, reject) => {
            const stream = cloudinary_1.default.uploader.upload_stream({
                resource_type: 'raw', // for DOCX/PDF uploads
                folder: 'applications',
                use_filename: true,
                unique_filename: false,
            }, (error, result) => {
                if (error)
                    return reject(error);
                resolve(result);
            });
            bufferStream.pipe(stream);
        });
        // Ensure result has secure_url before using it
        if (!result || !result.secure_url) {
            throw new Error("Failed to upload document to Cloudinary");
        }
        const application = await applicationsModel_1.default.create({
            firstName,
            lastName,
            institution,
            email,
            type,
            document: result.secure_url,
        });
        res.status(201).json({
            message: "Application created successfully",
            application,
        });
    }
    catch (error) {
        console.error("Error creating application:", error instanceof Error ? error.message : error);
        res.status(500).json({ message: "Error creating application" });
    }
};
exports.createApplication = createApplication;
const getApplications = async (req, res) => {
    try {
        const applications = await applicationsModel_1.default.find({});
        res.status(200).json(applications);
    }
    catch (error) {
        console.error("Error fetching applications:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getApplications = getApplications;
const getApplicationById = async (req, res) => {
    try {
        const id = req.params.id;
        const application = await applicationsModel_1.default.findById(id);
        if (!application) {
            res.status(404).json({ message: "Application not found" });
            return;
        }
        res.status(200).json(application);
    }
    catch (error) {
        console.error("Error fetching application by id:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getApplicationById = getApplicationById;
