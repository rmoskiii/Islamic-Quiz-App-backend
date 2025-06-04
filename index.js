const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { connectToDB } = require("./db");
const authRoutes = require("./routes/authRoutes");
const quizRoutes = require("./routes/quizRoutes");
const leaderboardRoutes = require("./routes/leaderboardRoutes");

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/leaderboard", leaderboardRoutes);

// ✅ Default test route
app.get("/", (req, res) => {
    res.send("✅ API is working");
});

// ✅ Connect to DB and Start Server with try/catch
(async () => {
    try {
        await connectToDB();
        console.log("✅ MongoDB connected");
        app.listen(3000, () => {
            console.log("🚀 Server running on http://localhost:3000");
        });
    } catch (error) {
        console.error("❌ Failed to connect to database or start server:");
        console.error(error.message || error);
        process.exit(1); // exit the app if DB connection fails
    }
})();
