const { getDB } = require("../db");

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
