import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function Quiz() {
  const [topic, setTopic] = useState("");
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();

  const normalize = (text) =>
    String(text || "")
      .trim()
      .toLowerCase()
      .replace(/\s+/g, " ");

  const getCorrectAnswer = (q) => {
    const ans = String(q.answer || "").trim();

    if (["A", "B", "C", "D"].includes(ans.toUpperCase())) {
      const index = ans.toUpperCase().charCodeAt(0) - 65;
      return q.options[index];
    }

    return ans;
  };

  const generateQuiz = async () => {
    if (!topic.trim()) {
      alert("Enter topic");
      return;
    }

    setLoading(true);
    setScore(null);
    setSelectedAnswers({});
    setQuestions([]);

    try {
      const response = await axios.post("http://localhost:5000/api/generate-quiz", {
        topic,
      });

      setQuestions(response.data.quiz);
    } catch (error) {
      alert("Quiz generation failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (questionIndex, option) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: option,
    }));
  };

  const submitQuiz = async () => {
    if (Object.keys(selectedAnswers).length !== questions.length) {
      alert("Please answer all questions");
      return;
    }

    let marks = 0;

    questions.forEach((q, index) => {
      const selected = selectedAnswers[index];
      const correctAnswer = getCorrectAnswer(q);

      if (normalize(selected) === normalize(correctAnswer)) {
        marks++;
      }
    });

    setScore(marks);

    try {
      const user = JSON.parse(localStorage.getItem("smartgaonUser"));

      await axios.post("http://localhost:5000/api/save-score", {
        name: user?.fullName || "Student",
        topic,
        score: marks,
        total: questions.length,
      });
    } catch (error) {
      console.log("Score save failed", error);
    }
  };
  useEffect(() => {
  const topicFromUrl = searchParams.get("topic");

  if (topicFromUrl) {
    setTopic(topicFromUrl);
  }
}, []);

  return (
    
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="p-8">
        <h1 className="text-4xl font-bold text-blue-400 mb-8 text-center">
          AI Quiz Generator
        </h1>

        <div className="max-w-4xl mx-auto bg-white/10 border border-white/10 p-8 rounded-3xl shadow-xl mb-8">
          <input
            className="w-full bg-slate-900 border border-white/10 p-4 rounded-xl text-white outline-none mb-4"
            placeholder="Enter topic, example: Photosynthesis"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />

          <button
            onClick={generateQuiz}
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 px-6 py-3 rounded-xl font-semibold"
          >
            {loading ? "Generating..." : "Generate Quiz"}
          </button>
        </div>

        {questions.length > 0 && (
          <div className="max-w-4xl mx-auto bg-white/10 border border-white/10 p-8 rounded-3xl shadow-xl">
            {questions.map((q, index) => (
              <div key={index} className="mb-8 border-b border-white/10 pb-6">
                <h2 className="text-2xl font-bold mb-4">
                  Question {index + 1}
                </h2>

                <p className="text-lg mb-5 text-slate-300">{q.question}</p>

                <div className="space-y-3">
                  {q.options.map((option, optionIndex) => (
                    <label
                      key={optionIndex}
                      className={`block border p-3 rounded-xl cursor-pointer transition ${
                        selectedAnswers[index] === option
                          ? "bg-blue-600 border-blue-400 text-white"
                          : "bg-slate-900 border-white/10 text-slate-300 hover:bg-slate-800"
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question-${index}`}
                        checked={selectedAnswers[index] === option}
                        onChange={() => handleSelect(index, option)}
                        className="mr-2"
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
            ))}

            <button
              onClick={submitQuiz}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700"
            >
              Submit Quiz
            </button>

            {score !== null && (
              <div className="mt-8 bg-green-500/10 border border-green-400/20 p-5 rounded-xl">
                <h2 className="text-2xl font-bold text-green-400">
                  Your Score: {score}/{questions.length}
                </h2>

                <p className="mt-2 text-slate-300">
                  {score === questions.length
                    ? "Excellent work!"
                    : score >= Math.ceil(questions.length / 2)
                    ? "Good attempt. Keep practicing."
                    : "You need more practice. Try again."}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}