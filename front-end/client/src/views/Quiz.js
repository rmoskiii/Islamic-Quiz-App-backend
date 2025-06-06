import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

function Quiz() {
    const { user } = useAuth();
    const [questions, setQuestions] = useState([]);
    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState(null);
    const [showExplanation, setShowExplanation] = useState(false);
    const [score, setScore] = useState(0);
    const [done, setDone] = useState(false);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const res = await axios.get("http://localhost:3000/api/quiz");
                setQuestions(res.data);
            } catch (err) {
                console.error("Failed to load quiz", err);
            }
        };
        fetchQuestions();
    }, []);

    if (!user) return <p>Please login to access the quiz.</p>;
    if (questions.length === 0) return <p>Loading...</p>;

    const currentQ = questions[current];

    const handleAnswer = (choiceIndex) => {
        setSelected(choiceIndex);
        setShowExplanation(true);

        if (choiceIndex === currentQ.correctAnswer) {
            setScore(score + 1);
        }
    };

    const next = () => {
        if (current + 1 < questions.length) {
            setCurrent(current + 1);
            setSelected(null);
            setShowExplanation(false);
        } else {
            setDone(true);
        }
    };

    return (
        <div style={{ padding: 20 }}>
            <Navbar />
            <h2>🧠 Islam Quiz</h2>

            {done ? (
                <div>
                    <h3>
                        Your score: {score} / {questions.length}
                    </h3>
                    <p>Well done! 🎉</p>
                </div>
            ) : (
                <>
                    <h3>{currentQ.question}</h3>
                    <ul style={{ listStyle: "none", padding: 0 }}>
                        {currentQ.options.map((choice, i) => (
                            <li key={i}>
                                <button
                                    style={{
                                        backgroundColor:
                                            selected === i
                                                ? i === currentQ.correctAnswer
                                                    ? "lightgreen"
                                                    : "lightcoral"
                                                : "white",
                                        margin: "5px",
                                    }}
                                    onClick={() => handleAnswer(i)}
                                    disabled={selected !== null}
                                >
                                    {choice}
                                </button>
                            </li>
                        ))}
                    </ul>

                    {showExplanation && (
                        <div style={{ marginTop: 10 }}>
                            <p>
                                <strong>Explanation:</strong> {currentQ.explanation}
                            </p>
                            <p>
                                <strong>Reference:</strong> {currentQ.reference}
                            </p>
                            <button onClick={next}>Next</button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default Quiz;
