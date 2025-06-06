import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
    const { user, logout, loading } = useAuth(); // <-- include loading
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    if (loading) {
        return (
            <nav style={{ padding: "1rem" }}>
                <span>Loading...</span>
            </nav>
        );
    }

    return (
        <nav
            style={{
                display: "flex",
                gap: "1rem",
                padding: "1rem",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            <div>
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
                <div>
                    <span style={{ marginRight: "1rem" }}>
                        👋 As-salamu alaykum, {user.username}
                    </span>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
