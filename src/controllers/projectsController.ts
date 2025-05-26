import { Request, Response } from "express";
import Project from "../models/projectsModel";
import cloudinary from "../config/cloudinary";
import { Readable } from "stream";

export const createProject = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    const files = req.files as Express.Multer.File[];

    if (!files || files.length === 0) {
      return res.status(400).json({ message: "At least one image is required" });
    }

    // Upload each image to Cloudinary
    const uploadPromises = files.map((file) => {
      const stream = Readable.from(file.buffer);
      return new Promise<any>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "projects",
            resource_type: "image",
            use_filename: true,
            unique_filename: false,
          },
          (err, result) => {
            if (err) return reject(err);
            resolve(result?.secure_url);
          }
        );
        stream.pipe(uploadStream);
      });
    });

    const imageUrls = await Promise.all(uploadPromises);

    await Project.create({ title, description, images: imageUrls });

    res.status(201).json({
      message: "Project created successfully",
      data: {
        title,
        description,
        images: imageUrls,
      },
    });
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ message: "Failed to create project" });
  }
};


