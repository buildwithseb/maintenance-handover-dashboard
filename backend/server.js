require("dotenv").config();
const express = require("express");
const cors = require("cors");
const adminRoutes = require("./routes/admin.js");
const trackerRoutes = require("./routes/tracker")
const { connectDB } = require("./config/db.js");

const app = express();

const port = process.env.PORT || 3000;

const allowedOrigins = [
  "http://localhost:8081",
  "https://maintenance-handover-dashboard.vercel.app"
];

app.use(cors({
  origin(origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`CORS not allowed for origin: ${origin}`));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());
app.use(adminRoutes);
app.use(trackerRoutes);

async function startServer() {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();