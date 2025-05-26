import { Router } from "express";
import { createApplication } from "../controllers/applicationsController";
import upload from "../middlewares/multer";

const router = Router();

router.post("/send", upload.single("document"), createApplication);

export default router;
