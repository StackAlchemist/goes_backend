"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongodb_1 = __importDefault(require("./config/mongodb"));
const cors_1 = __importDefault(require("cors"));
const messagesRoutes_1 = __importDefault(require("./routes/messagesRoutes"));
const applicationsRoutes_1 = __importDefault(require("./routes/applicationsRoutes"));
const projectRoutes_1 = __importDefault(require("./routes/projectRoutes"));
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
const app = (0, express_1.default)();
(0, mongodb_1.default)();
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_URL,
    credentials: true // boolean, not string
}));
app.use(express_1.default.json());
app.use("/api/messages", messagesRoutes_1.default);
app.use("/api/applications", applicationsRoutes_1.default);
app.use("/api/projects", projectRoutes_1.default);
app.use("/api/admin", adminRoutes_1.default);
app.listen(2000, () => {
    console.log("Server is running on port 3000");
});
