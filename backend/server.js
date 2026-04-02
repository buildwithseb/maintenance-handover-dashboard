require('dotenv').config();
const express = require("express");
const cors = require("cors");
const equipmentRoutes = require("./routes/equipments.js");

const app = express();

const port = process.env.PORT || 3000;
const frontEndUrl = process.env.FRONTEND_URL || "http://localhost:8081";




app.use(cors({
    origin: frontEndUrl,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type"]
}));


app.use(express.json());


app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
})

app.use(equipmentRoutes);



app.listen(port)