import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDBs } from "./src/config/db.js";
import routes from "./src/routes/routes.js";

dotenv.config();

const app = express();

// ✅ Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // ✅ exact match with your frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);


app.use(express.json());

// ✅ Request logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// ✅ Main Routes
app.use("/api", routes);

// ✅ Global error handler
app.use((err, req, res, next) => {
  console.error("Global Error:", err.stack || err);
  res.status(500).json({
    message: "Internal Server Error",
    error: err.message,
  });
});

// ✅ Start server only after DB connections succeed
const PORT = process.env.PORT || 5001;

const startServer = async () => {
  try {
    await connectDBs(); // wait until DBs are connected
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
};

startServer();
