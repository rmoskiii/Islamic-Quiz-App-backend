import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Quiz from "./views/Quiz";
import Leaderboard from "./views/Leaderboard";

function App() {
  return (
      <Router>
        <nav style={{ display: "flex", gap: "1rem", padding: "1rem" }}>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
          <Link to="/quiz">Quiz</Link>
          <Link to="/leaderboard">Leaderboard</Link>
        </nav>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </Router>
  );
}

export default App;
