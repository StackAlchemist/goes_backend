import { Router, Request, Response } from "express";
import { createProject, deleteProject, editProject, getProjectById, getProjects } from "../controllers/projectsController";
import uploadImage from "../middlewares/uploadImage";

const router = Router();


router.post("/create", uploadImage.array("images"), (req: Request, res: Response) => {
  createProject(req, res);
});
router.get("/get", (req: Request, res: Response) => {
  getProjects(req, res);
})
router.get("/get/:id", (req: Request, res: Response) => {
  getProjectById(req, res);
})
router.patch("/edit/:id", (req: Request, res: Response) => {
  editProject(req, res);
})
router.delete("/delete/:id", (req: Request, res: Response) => {
  deleteProject(req, res);
})


export default router;