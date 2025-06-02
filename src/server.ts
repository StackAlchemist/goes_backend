import express from "express";
import connectDB from "./config/mongodb";
import cors from 'cors'
import messagesRoutes from "./routes/messagesRoutes";
import applicationsRoutes from "./routes/applicationsRoutes";
import projectsRoutes from "./routes/projectRoutes";
import adminRoutes from "./routes/adminRoutes"
const app = express();

connectDB();
app.use(cors({
    origin: [process.env.CLIENT_URL || "", "https://gani-ola.vercel.app"],
    credentials: true
  }));
app.use(express.json());
app.use("/api/messages", messagesRoutes);
app.use("/api/applications", applicationsRoutes);
app.use("/api/projects", projectsRoutes);   
app.use("/api/admin", adminRoutes)


app.listen(2000, () => {
    console.log("Server is running on port 3000");
});