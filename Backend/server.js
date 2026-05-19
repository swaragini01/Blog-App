import exp from "express";
import { connect } from "mongoose";
import { config } from "dotenv";
import { userRoute } from "./APIs/UserAPI.js";
import cookieParser from "cookie-parser";
import { adminRoute } from "./APIs/AdminAPI.js";
import { authorRoute } from "./APIs/AuthorAPI.js";
import { commonRouter } from "./APIs/CommonAPI.js";
import cors from "cors";

// Load environment variables from .env file
config(); 

// Create express application
const app = exp();

// --- 1. CONFIGURING ALLOWED FRONTEND ORIGINS (CORS) ---
const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://blog-app-ashen-one-56.vercel.app",
  "https://blog-app-new-pi.vercel.app", 
  "https://blog-app-6vxketqrl-23eg112d59-1850s-projects.vercel.app" // Your current active Vercel preview URL
];

// If you deploy your frontend to Render later, add its URL to this environment variable
if (process.env.FRONTEND_RENDER_URL) {
  allowedOrigins.push(process.env.FRONTEND_RENDER_URL);
}

app.use(cors({ 
  origin: allowedOrigins,
  credentials: true 
}));

// Add body parser middleware
app.use(exp.json());

// Add cookie parser middleware
app.use(cookieParser());

// --- 2. ROOT AND HEALTH CHECK ROUTES ---
// Fixed: This prevents the "/" is invalid path error when visiting http://localhost:5000/
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the Blog App API. Server is running perfectly!" });
});

app.get("/health", (req, res) => {
  res.status(200).json({ message: "Backend is running" });
});

// --- 3. CONNECT API ROUTERS ---
app.use("/user-api", userRoute);
app.use("/author-api", authorRoute);
app.use("/admin-api", adminRoute);
app.use("/common-api", commonRouter);

// --- 4. DATABASE CONNECTION & SERVER START ---
const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing in your .env file!");
    }
    
    await connect(process.env.MONGO_URI);
    console.log("DB connection success");

    // Dynamically uses Render's assigned port or defaults to 5000 locally
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    
  } catch (err) {
    console.log("Err in DB connection", err);
  }
};

connectDB();

// --- 5. FALLBACK FOR UNHANDLED/INVALID PATHS ---
app.use((req, res, next) => {
  console.log(`404 - Invalid Path Request: ${req.url}`);
  res.status(404).json({ message: `${req.url} is invalid path` });
});

// --- 6. GLOBAL ERROR HANDLING MIDDLEWARE ---
app.use((err, req, res, next) => {
  const status = err.status || err.statusCode || 500;
  const isProduction = process.env.NODE_ENV === "production";

  let message = err.message || "Unexpected error";
  let details;

  // Mongoose validation errors
  if (err.name === "ValidationError") {
    message = "Validation error";
    details = Object.values(err.errors || {}).map((e) => e.message);
  }

  // Mongoose cast errors (e.g., invalid ObjectId)
  if (err.name === "CastError") {
    message = "Invalid value for field";
    details = [`${err.path} is invalid`];
  }

  // Duplicate key errors
  if (err.code === 11000) {
    message = "Duplicate value";
    const fields = Object.keys(err.keyValue || {});
    details = fields.length ? fields.map((f) => `${f} already exists`) : undefined;
  }

  // Strict mode "throw" errors from schema
  if (err.name === "StrictModeError") {
    message = "Invalid fields provided";
    details = err.path ? [`${err.path} is not allowed`] : undefined;
  }

  // Default to 400 for known client errors without explicit status
  const finalStatus = status === 500 && (err.name || err.code) ? 400 : status;

  const response = {
    message,
    status: finalStatus,
  };

  if (details) response.details = details;
  if (!isProduction) {
    response.stack = err.stack;
  }

  console.log("Error Handled:", err.message || err);
  res.status(finalStatus).json(response);
});