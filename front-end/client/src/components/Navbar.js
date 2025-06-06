import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav style={{
            display: "flex",
            gap: "1rem",
            padding: "1rem",
            backgroundColor: "#f0f0f0",
            borderBottom: "1px solid #ccc"
        }}>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
            <Link to="/quiz">Quiz</Link>
            <Link to="/leaderboard">Leaderboard</Link>
        </nav>
    );
};

export default Navbar;
