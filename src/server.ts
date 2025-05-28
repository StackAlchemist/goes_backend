import express from "express";
import connectDB from "./config/mongodb";
import cors from 'cors'
import messagesRoutes from "./routes/messagesRoutes";
import applicationsRoutes from "./routes/applicationsRoutes";
import projectsRoutes from "./routes/projectRoutes";
const app = express();

connectDB();
app.use(cors())
app.use(express.json());
app.use("/api/messages", messagesRoutes);
app.use("/api/applications", applicationsRoutes);
app.use("/api/projects", projectsRoutes);   


app.listen(2000, () => {
    console.log("Server is running on port 3000");
});