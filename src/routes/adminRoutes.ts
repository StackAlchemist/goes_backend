    import express, { Router } from 'express';
import { adminLogin, adminSignup, logout } from '../controllers/adminController';

const router = Router();

router.post('/login', adminLogin);
router.post('/signup', adminSignup);
router.post('/logout', logout);

export default router;