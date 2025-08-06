import express from 'express';
import cloudinary from 'cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import nodemailer from 'nodemailer';
import fs from 'fs';
import connectDB from './src/config/db.js';
import authRoutes from './src/routes/authRoutes.js';
import geminiRoute from './src/routes/geminiRoute.js'; // ✅ Gemini AI route

dotenv.config();

const { v2: cloudinaryV2 } = cloudinary;
const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Request logger to show endpoint and method
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// ✅ Connect to DB
connectDB();

// ✅ Email contact route
app.post('/contact', async (req, res) => {
  const { name, email, question } = req.body;
  if (!name || !email || !question)
    return res.status(400).json({ message: 'All fields are required' });

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.RECIPIENT_EMAIL,
    subject: `New Contact Message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${question}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ message: 'Error sending email', error: error.message });
  }
});

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/travel', geminiRoute); // e.g., POST /api/travel/recommendations

// ✅ Global error handler
app.use((err, req, res, next) => {
  console.error('Global Error:', err);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

// ✅ Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
