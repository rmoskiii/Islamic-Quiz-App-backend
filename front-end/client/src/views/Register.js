import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Signup() {
    const [form, setForm] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3000/api/auth/register", form);
            navigate("/login");
        } catch (err) {
            setError("Signup failed");
        }
    };

    return (
        <div>
            <Navbar />
            <div style={{ padding: 20 }}>
                <h2>Sign Up</h2>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input type="text" name="username" placeholder="Username" value={form.username} onChange={handleChange} required />
                    <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    );
}

export default Signup;
