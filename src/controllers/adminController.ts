import Admin from '../models/adminModels';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Types } from 'mongoose';

dotenv.config();

const maxAge: number = 1 * 24 * 60 * 60; // 1 day

const createToken = (id: Types.ObjectId): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: maxAge,
  });
};

// Admin Signup
export const adminSignup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;
    const admin = new Admin({ name, email, password });
    await admin.save();

    const token = createToken(admin._id as Types.ObjectId);
    res.cookie('authToken', token, { httpOnly: true, maxAge: maxAge * 1000, sameSite: 'lax' });

    res.status(201).json({
      message: 'Admin created successfully',
      user: admin._id,
      name: admin.name,
      token,
    });
  } catch (error: unknown) {
    console.error('Signup error:', error);
    res.status(400).json({ message: error instanceof Error ? error.message : 'Error creating admin' });
  }
};

// Admin Login
export const adminLogin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    // Here, Admin.login returns a Mongoose Document (IAdmin)
    const admin = await Admin.login(email, password);

    const token = createToken(admin._id as Types.ObjectId);
    res.cookie('authToken', token, { httpOnly: true, maxAge: maxAge * 1000, sameSite: 'lax' });

    res.status(200).json({
      message: 'Admin logged in successfully',
      user: admin._id,
      name: admin.name,
      email: admin.email,
      token,
    });
  } catch (error: unknown) {
    console.error('Login error:', error);
    res.status(400).json({ message: error instanceof Error ? error.message : 'Error logging in' });
  }
};

// Admin Logout
export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    res.cookie('authToken', '', { httpOnly: true, maxAge: 0 });
    res.status(200).json({ message: 'Logout successful' });
  } catch (error: unknown) {
    console.error('Logout error:', error);
    res.status(500).json({ message: error instanceof Error ? error.message : 'Internal Server Error' });
  }
};
