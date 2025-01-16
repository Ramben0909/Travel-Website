import cloudinary from 'cloudinary'; // Default import
const { v2: cloudinaryV2 } = cloudinary; // Destructure v2 from the default import
import express from 'express';
import multer from 'multer';
import dotenv from 'dotenv';
import cors from 'cors'; // Import CORS
import path from 'path'; // Import path for file handling
import nodemailer from 'nodemailer'; // Import nodemailer for email functionality

dotenv.config();

// Configure Cloudinary
cloudinaryV2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

// Enable CORS for all routes
app.use(cors());
app.use(express.json()); // Middleware to parse JSON request bodies

// Configure multer for file uploads
const upload = multer({
  dest: 'uploads/', // Temporary storage
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit size to 5MB
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/; // Allowed file types
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb('Error: File type not supported');
    }
  },
});

// Upload route
app.post('/upload', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  try {
    const result = await cloudinaryV2.uploader.upload(req.file.path);
    res.json({ message: 'Upload successful', url: result.secure_url });
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    res.status(500).json({ message: 'Error uploading image', error: error.message });
  }
});

// Email route
app.post('/contact', async (req, res) => {
  const { name, email, question } = req.body;

  if (!name || !email || !question) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Configure the email transporter
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

  const mailOptions = {
    from: email,
    to: process.env.RECIPIENT_EMAIL, // Add the recipient's email in your .env file
    subject: `New Contact Message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${question}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error sending email', error: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
