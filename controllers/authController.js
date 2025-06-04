const { getDB } = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    const { username, password } = req.body;
    const db = getDB();
    const users = db.collection("users");
    try {
        const existing = await users.findOne({ username });
        if (existing) {
            return res.status(400).json({ error: "User already exists" });
        }

        const hashed = await bcrypt.hash(password, 10);
        await users.insertOne({ username, password: hashed, score: 0 });

        res.status(201).json({ message: "User created" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Registration failed" });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    console.log("🔐 Login attempt:", username);

    try {
        const db = getDB();
        console.log("✅ Got DB connection");

        const user = await db.collection("users").findOne({ username });
        console.log("👤 Found user:", user);

        if (!user) {
            return res.status(400).json({ error: "Invalid username" });
        }

        const match = await bcrypt.compare(password, user.password);
        console.log("🔍 Password match:", match);

        if (!match) {
            return res.status(400).json({ error: "Invalid password" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        console.log("✅ JWT generated");

        res.json({
            token,
            user: {
                username: user.username,
                score: user.score || 0
            }
        });
    } catch (err) {
        console.error("❌ Login error:", err);
        res.status(500).json({ error: "Server error" });
    }
};
