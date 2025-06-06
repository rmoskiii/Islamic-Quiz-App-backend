import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import styles from "./Leaderboard.module.css";

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
        <>
            <Navbar />
            <div className={styles.container}>
                <h2 className={styles.title}>🏆 Leaderboard</h2>
                {!user ? (
                    <p className={styles.message}>Please login to see the leaderboard.</p>
                ) : leaders.length === 0 ? (
                    <p className={styles.message}>No scores yet. Be the first to play!</p>
                ) : (
                    <ul className={styles.list}>
                        {leaders.map((leader, index) => (
                            <li key={index} className={styles.item}>
                                <span className={styles.rank}>#{index + 1}</span>
                                <span className={styles.username}>{leader.username}</span>
                                <span className={styles.score}>{leader.score} pts</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
}

export default Leaderboard;
