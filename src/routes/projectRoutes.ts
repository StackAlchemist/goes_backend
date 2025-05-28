import { Router } from "express";
import { createProject, getProjectById, getProjectById, getProjects } from "../controllers/projectsController";
import uploadImage from "../middlewares/uploadImage";

const router = Router();


router.post("/create", uploadImage.array("images"), createProject);
router.get("/get", getProjects)
router.get("/get/:id", getProjectById)

export default router;