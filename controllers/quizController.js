const { ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const { getDB } = require("../db");

exports.submitAnswers = async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1]; // "Bearer <token>"
    const { answers } = req.body;

    if (!token) return res.status(401).json({ error: "No token provided" });
    if (!Array.isArray(answers)) return res.status(400).json({ error: "Answers must be an array" });

    try {
        // 🔐 Verify user
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        const db = getDB();
        const questions = await db.collection("questions").find().toArray();

        // ✅ Score the answers
        let score = 0;
        questions.forEach((q, i) => {
            if (answers[i] === q.correctAnswer) {
                score++;
            }
        });

        // 🧠 Update user score in DB (replace if higher)
        const user = await db.collection("users").findOne({ _id: new ObjectId(userId) });
        const bestScore = user.score || 0;

        if (score > bestScore) {
            await db.collection("users").updateOne(
                { _id: new ObjectId(userId) },
                { $set: { score: score } }
            );
        }

        res.json({ message: "Quiz submitted", score });

    } catch (err) {
        console.error("❌ Submit error:", err);
        res.status(500).json({ error: "Server error" });
    }
};
exports.getQuestions = async (req, res) => {
    try {
        const db = getDB();
        const questions = await db.collection("questions").find().toArray();
        res.json(questions);
    } catch (err) {
        console.error("❌ Error getting questions:", err);
        res.status(500).json({ error: "Server error" });
    }
};

exports.addQuestion = async (req, res) => {
    const { question, options, correctAnswer, explanation, reference } = req.body;

    if (!question || !options || options.length !== 4 || correctAnswer == null) {
        return res.status(400).json({ error: "Invalid question format" });
    }

    try {
        const db = getDB();
        await db.collection("questions").insertOne({
            question,
            options,
            correctAnswer, // this should be the index (e.g. 0 to 3)
            explanation,
            reference
        });
        res.status(201).json({ message: "Question added" });
    } catch (err) {
        console.error("❌ Error adding question:", err);
        res.status(500).json({ error: "Server error" });
    }
};
