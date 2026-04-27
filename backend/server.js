require("dotenv").config();
const express = require("express");
const session = require('express-session');
const csrf = require("csurf");
const MongoDBStore = require('connect-mongodb-session')(session);
const cors = require("cors");

const adminRoutes = require("./routes/admin.js");
const trackerRoutes = require("./routes/tracker");
const authRoutes = require("./routes/auth")
const { connectDB } = require("./config/db");

const app = express();

const store = new MongoDBStore({
  uri: process.env.MONGODB_URI,
  collection: 'sessions'
});

const port = process.env.PORT || 3000;

const allowedOrigins = [
  "http://localhost:8081",
  "https://maintenance-handover-dashboard.vercel.app"
];

const csrfProtection = csrf();

app.use(session({
  secret: 'my secret key',
  resave: false,
  saveUninitialized: false,
  store: store,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60, // 1 hour
  }
}));

app.use(cors({
  origin(origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`CORS not allowed for origin: ${origin}`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type","CSRF-Token"]
}));

app.use(csrfProtection);
app.use(express.json());
app.use(adminRoutes);
app.use(trackerRoutes);
app.use(authRoutes);

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