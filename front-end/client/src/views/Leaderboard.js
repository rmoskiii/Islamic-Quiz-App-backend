import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Leaderboard() {
    const [leaders, setLeaders] = useState([]);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const res = await axios.get("http://localhost:3000/api/leaderboard");
                setLeaders(res.data);
            } catch (err) {
                console.error("Failed to load leaderboard", err);
            }
        };
        fetchLeaderboard();
    }, []);

    return (
        <div>
            <Navbar />
            <div style={{ padding: 20 }}>
                <h2>🏆 Leaderboard</h2>
                <ul>
                    {leaders.map((user, index) => (
                        <li key={user._id}>
                            {index + 1}. {user.username} — {user.score} pts
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Leaderboard;
