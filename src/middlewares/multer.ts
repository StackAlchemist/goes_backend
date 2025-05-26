// middlewares/upload.ts
import multer from "multer";

const storage = multer.memoryStorage(); // ✅ switch to memory
const upload = multer({ storage });

export default upload;
