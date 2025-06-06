import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import styles from "./Quiz.module.css";

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

    if (!user) return <p className={styles.message}>Please login to access the quiz.</p>;
    if (questions.length === 0) return <p className={styles.message}>Loading...</p>;

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
        <>
            <Navbar />
            <div className={styles.quizContainer}>
                <h2 className={styles.title}>🧠 Islam Quiz</h2>

                {done ? (
                    <div className={styles.result}>
                        <h3>Your score: {score} / {questions.length}</h3>
                        <p>Well done! 🎉</p>
                    </div>
                ) : (
                    <div>
                        <h3 className={styles.question}>{currentQ.question}</h3>
                        <ul className={styles.options}>
                            {currentQ.options.map((choice, i) => (
                                <li key={i}>
                                    <button
                                        className={`${styles.optionButton} ${
                                            selected !== null
                                                ? i === currentQ.correctAnswer
                                                    ? styles.correct
                                                    : selected === i
                                                        ? styles.incorrect
                                                        : ""
                                                : ""
                                        }`}
                                        onClick={() => handleAnswer(i)}
                                        disabled={selected !== null}
                                    >
                                        {choice}
                                    </button>
                                </li>
                            ))}
                        </ul>

                        {showExplanation && (
                            <div className={styles.explanation}>
                                <p><strong>Explanation:</strong> {currentQ.explanation}</p>
                                <p><strong>Reference:</strong> {currentQ.reference}</p>
                                <button onClick={next} className={styles.nextButton}>Next</button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}

export default Quiz;
