const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { connectToDB } = require("./db");
const authRoutes = require("./routes/authRoutes");
const quizRoutes = require("./routes/quizRoutes");


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/quiz", quizRoutes);

// Connect to DB and start server
connectToDB().then(() => {
    app.listen(3000, () => {
        console.log("🚀 Server running on port 3000");
    });
});

app.get("/", (req, res) => {
    res.send("API is working");
});
