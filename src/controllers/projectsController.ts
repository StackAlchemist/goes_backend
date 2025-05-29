import { Request, Response } from "express";
import Project from "../models/projectsModel";
import cloudinary from "../config/cloudinary";
import { Readable } from "stream";

export const createProject = async (req: Request, res: Response) => {
  console.log('project creation request was sent')
  try {
    const { title, description, status, location } = req.body;
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

    await Project.create({ title, description, images: imageUrls, status, location });

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
  } catch (error) {
    console.error("Error creating project:", error.message, error.stack);
    res.status(500).json({ message: "Failed to create project" });
  }
};

export const getProjects = async (req: Request, res: Response)=>{
  try {
    const projects = await Project.find({})
    res.status(200).json(projects)
  } catch (error) {
    console.error(error)
    res.status(500).json({message: 'internal server error'})
  }
}

export const getProjectById = async (req: Request, res: Response) => {
  try {
    const projectId = req.params.id;
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// src/controllers/projectsController.ts/ adjust path as needed

export const editProject = async (req: Request, res: Response) => {
  try {
    const projectId = req.params.id;
    const { title, description, status, location } = req.body;

    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      { title, description, status, location },
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json(updatedProject);
  } catch (error) {
    console.error("Error editing project:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const projectId = req.params.id;
    await Project.findByIdAndDelete(projectId);
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};






