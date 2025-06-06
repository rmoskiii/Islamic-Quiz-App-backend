import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styles from "./Navbar.module.css";

function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className={styles.nav}>
            <div className={styles.links}>
                <Link to="/quiz">Quiz</Link>
                <Link to="/leaderboard">Leaderboard</Link>
                {!user && (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Signup</Link>
                    </>
                )}
            </div>

            {user && (
                <div className={styles.userSection}>
                    <span className={styles.greeting}>👋 As-salamu alaykum, {user.username}</span>
                    <button className={styles.logoutButton} onClick={handleLogout}>Logout</button>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
