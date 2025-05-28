import { Router } from "express";
import { createApplication, getApplicationById, getApplications } from "../controllers/applicationsController";
import upload from "../middlewares/multer";

const router = Router();

router.post("/send", upload.single("document"), createApplication);
router.get("/get", getApplications)
router.get("/get/:id", getApplicationById)


export default router;
