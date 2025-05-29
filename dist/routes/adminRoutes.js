"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminController_1 = require("../controllers/adminController");
const router = (0, express_1.Router)();
router.post('/login', adminController_1.adminLogin);
router.post('/signup', adminController_1.adminSignup);
router.post('/logout', adminController_1.logout);
exports.default = router;
