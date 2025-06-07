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
                        {leaders.map((leader, index) => {
                            const isCurrentUser = leader.username === user.username;
                            const initials = leader.username.slice(0, 2).toUpperCase();

                            return (
                                <li
                                    key={index}
                                    className={`${styles.item} ${isCurrentUser ? styles.currentUser : ""}`}
                                >
                                    <div className={styles.avatar}>{initials}</div>
                                    <div className={styles.details}>
          <span className={styles.username}>
            {leader.username}
              {isCurrentUser && <span className={styles.youBadge}> (You)</span>}
          </span>
                                        <span className={styles.score}>{leader.score} pts</span>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>

                )}
            </div>
        </>
    );
}

export default Leaderboard;
