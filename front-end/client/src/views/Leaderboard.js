import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

function Leaderboard() {
    const { user } = useAuth();
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
        <div style={{ padding: 20 }}>
            <Navbar />
            <h2>Leaderboard</h2>
            {!user && <p>Please login to see the leaderboard.</p>}
            {user && (
                <ul>
                    {leaders.map((leader, index) => (
                        <li key={index}>
                            {leader.username}: {leader.score}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Leaderboard;
