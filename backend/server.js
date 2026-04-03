require('dotenv').config();
const express = require("express");
const cors = require("cors");
const equipmentRoutes = require("./routes/equipments.js");
const { connectDB } = require("./config/db.js")

const app = express();

const port = process.env.PORT;
const frontEndUrl = process.env.FRONTEND_URL || "http://localhost:8081";

app.use(cors({
    origin: frontEndUrl,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type"]
}));


app.use(express.json());
app.use(equipmentRoutes);

// app.use((req, res, next) => {
//     console.log(req.method, req.url);
//     next();
// })

async function startServer() {
    try {
        await connectDB();
        app.listen(port, () => { console.log(`Serve running on port ${port}`) });
    } catch (error) {
        console.error("Failed to start serve:", error);
        process.exit(1);
    };

}

startServer()


