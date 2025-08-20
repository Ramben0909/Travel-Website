import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './src/config/db.js';
import routes from './src/routes/routes.js'; 

dotenv.config();

const app = express();

// ✅ Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// ✅ Connect to DB
connectDB();

// ✅ Main Routes
app.use('/api', routes);

app.use((err, req, res, next) => {
  console.error('Global Error:', err.stack || err);
  res.status(500).json({ 
    message: 'Internal Server Error', 
    error: err.message 
  });
});

// ✅ Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
