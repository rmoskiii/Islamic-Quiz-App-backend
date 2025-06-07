import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import styles from "./Login.module.css";
import msgStyles from "../components/Messages.module.css";

function Login() {
    const [form, setForm] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(""); // ✅ success state
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        try {
            const res = await axios.post("http://localhost:3000/api/auth/login", form);
            const userData = { username: form.username, token: res.data.token };
            login(userData);
            setSuccess("Login successful, Alhamdulillah! ✅");

            setTimeout(() => navigate("/quiz"), 1500);
        } catch (err) {
            setError("Login failed ❌");
        }
    };

    return (
        <div>
            <Navbar />
            <div className={styles.container}>
                <h2 className={styles.title}>Login</h2>

                {success && <p className={msgStyles.success}>{success}</p>}
                {error && <p className={msgStyles.error}>{error}</p>}

                <form onSubmit={handleSubmit}>
                    <input
                        className={styles.input}
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={form.username}
                        onChange={handleChange}
                        required
                    />
                    <input
                        className={styles.input}
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit" className={styles.button}>
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
