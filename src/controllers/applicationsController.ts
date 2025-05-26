import Applications from "../models/applicationsModel";
import cloudinary from "../config/cloudinary";
import { Request, Response } from "express";
import { Readable } from "stream";

export const createApplication = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, institution, email, type } = req.body;
    const document = req.file;

    if (!document) {
      return res.status(400).json({ message: "Document is required" });
    }

    const bufferStream = Readable.from(document.buffer);

    const result = await new Promise<any>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'raw', // For DOCX/PDF uploads
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

    const application = await Applications.create({
      firstName,
      lastName,
      institution,
      email,
      type,
      document: result.secure_url,
    });

    res.status(201).json({ message: "Application created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating application" });
  }
};  
