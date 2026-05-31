import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function Leaderboard() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/leaderboard"
      );

      setStudents(response.data.leaderboard);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="p-8">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-8 rounded-3xl shadow mb-8">
          <h1 className="text-4xl font-bold mb-3">
            Student Leaderboard 🏆
          </h1>

          <p className="text-lg text-slate-200">
            Top students based on AI quiz performance.
          </p>
        </div>

        <div className="max-w-6xl mx-auto bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl overflow-hidden shadow-xl">
          <table className="w-full text-left">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-5">Rank</th>
                <th className="p-5">Student</th>
                <th className="p-5">Topic</th>
                <th className="p-5">Score</th>
                <th className="p-5">Date</th>
              </tr>
            </thead>

            <tbody>
              {students.map((student, index) => (
                <tr
                  key={student.id}
                  className="border-b border-white/10 hover:bg-white/5 transition"
                >
                  <td className="p-5 font-bold text-xl">
                    {index === 0
                      ? "🥇"
                      : index === 1
                      ? "🥈"
                      : index === 2
                      ? "🥉"
                      : index + 1}
                  </td>

                  <td className="p-5 font-semibold text-white">
                    {student.name}
                  </td>

                  <td className="p-5 text-blue-300">
                    {student.topic}
                  </td>

                  <td className="p-5">
                    <span className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full font-bold">
                      {student.score}/{student.total}
                    </span>
                  </td>

                  <td className="p-5 text-slate-400 text-sm">
                    {student.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {students.length === 0 && (
            <div className="text-center py-10 text-slate-400">
              No leaderboard data yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}