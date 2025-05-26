import { Router } from "express";
import { createProject } from "../controllers/projectsController";
import uploadImage from "../middlewares/uploadImage";

const router = Router();


router.post("/create", uploadImage.array("images"), createProject);

export default router;