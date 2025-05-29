import { Router } from "express";
import { createProject, deleteProject, editProject, getProjectById, getProjects } from "../controllers/projectsController";
import uploadImage from "../middlewares/uploadImage";

const router = Router();


router.post("/create", uploadImage.array("images"), createProject);
router.get("/get", getProjects)
router.get("/get/:id", getProjectById)
router.patch("/edit/:id", editProject)
router.delete("/delete/:id", deleteProject)


export default router;