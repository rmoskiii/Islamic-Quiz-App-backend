// db.js
const { MongoClient } = require("mongodb");
require("dotenv").config();

const client = new MongoClient(process.env.MONGO_URI);

let db;

async function connectToDB() {
    try {
        await client.connect();
        db = client.db("quiz-app"); // Replace with your DB name
        console.log("✅ MongoDB connected using native driver");
    } catch (err) {
        console.error("❌ DB connection error:", err);
    }
}

function getDB() {
    if (!db) {
        throw new Error("DB not connected yet. Call connectToDB() first.");
    }
    return db;
}

module.exports = { connectToDB, getDB };
