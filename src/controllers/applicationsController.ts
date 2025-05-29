import Applications from "../models/applicationsModel";
import cloudinary from "../config/cloudinary";
import { Request, Response } from "express";
import { Readable } from "stream";

export const createApplication = async (req: Request, res: Response): Promise<void> => {
  try {
    const { firstName, lastName, institution, email, type } = req.body;
    const document = req.file;
    if (!document) {
      throw new Error("Document is required");
    }

    const bufferStream = Readable.from(document.buffer);

    const result = await new Promise<any>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'raw', // for DOCX/PDF uploads
          folder: 'applications',
          use_filename: true,
          unique_filename: false,
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      bufferStream.pipe(stream);
    });

    // Ensure result has secure_url before using it
    if (!result || !result.secure_url) {
      throw new Error("Failed to upload document to Cloudinary");
    }

    const application = await Applications.create({
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
  } catch (error: unknown) {
    console.error("Error creating application:", error instanceof Error ? error.message : error);
    res.status(500).json({ message: "Error creating application" });
  }
};

export const getApplications = async (req: Request, res: Response): Promise<void> => {
  try {
    const applications = await Applications.find({});
    res.status(200).json(applications);
  } catch (error: unknown) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getApplicationById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const application = await Applications.findById(id);
    if (!application) {
      res.status(404).json({ message: "Application not found" });
      return;
    }
    res.status(200).json(application);
  } catch (error: unknown) {
    console.error("Error fetching application by id:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
