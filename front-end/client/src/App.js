import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./views/Login";
import Signup from "./views/Register";
import Quiz from "./views/Quiz";
import Leaderboard from "./views/Leaderboard";

function App() {
  return (
      <Router>

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
