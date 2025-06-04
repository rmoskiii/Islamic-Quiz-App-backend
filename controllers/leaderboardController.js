const { getDB } = require("../db");

exports.getLeaderboard = async (req, res) => {
    try {
        const db = getDB();
        const users = await db.collection("users")
            .find({}, { projection: { username: 1, score: 1, _id: 0 } })
            .sort({ score: -1 })
            .limit(10)
            .toArray();

        res.json({ leaderboard: users });
    } catch (err) {
        console.error("Leaderboard error:", err);
        res.status(500).json({ error: "Could not fetch leaderboard" });
    }
};
