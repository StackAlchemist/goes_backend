"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.adminLogin = exports.adminSignup = void 0;
const adminModels_1 = __importDefault(require("../models/adminModels"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const maxAge = 1 * 24 * 60 * 60; // 1 day
const createToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: maxAge,
    });
};
// Admin Signup
const adminSignup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const admin = new adminModels_1.default({ name, email, password });
        yield admin.save();
        const token = createToken(admin._id);
        res.cookie('authToken', token, { httpOnly: true, maxAge: maxAge * 1000, sameSite: 'lax' });
        res.status(201).json({
            message: 'Admin created successfully',
            user: admin._id,
            name: admin.name,
            token,
        });
    }
    catch (error) {
        console.error('Signup error:', error);
        res.status(400).json({ message: error instanceof Error ? error.message : 'Error creating admin' });
    }
});
exports.adminSignup = adminSignup;
// Admin Login
const adminLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Here, Admin.login returns a Mongoose Document (IAdmin)
        const admin = yield adminModels_1.default.login(email, password);
        const token = createToken(admin._id);
        res.cookie('authToken', token, { httpOnly: true, maxAge: maxAge * 1000, sameSite: 'lax' });
        res.status(200).json({
            message: 'Admin logged in successfully',
            user: admin._id,
            name: admin.name,
            email: admin.email,
            token,
        });
    }
    catch (error) {
        console.error('Login error:', error);
        res.status(400).json({ message: error instanceof Error ? error.message : 'Error logging in' });
    }
});
exports.adminLogin = adminLogin;
// Admin Logout
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.cookie('authToken', '', { httpOnly: true, maxAge: 0 });
        res.status(200).json({ message: 'Logout successful' });
    }
    catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({ message: error instanceof Error ? error.message : 'Internal Server Error' });
    }
});
exports.logout = logout;
