import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Progress() {
  const navigate = useNavigate();

  const [progressData, setProgressData] = useState({
    quizzesAttempted: 0,
    latestScore: "0/0",
    courseCompleted: 0,
    weakSubject: "Not available",
    learningLevel: "Beginner",
    streak: 0,
    assignmentsCompleted: 0,
  });

  const [subjectProgress, setSubjectProgress] = useState([]);

  const achievements = [
    {
      title: "First Quiz Completed",
      desc: "You completed your first quiz.",
      icon: "🏅",
    },
    {
      title: "Active Learner",
      desc: "You are regularly using SmartGaon.",
      icon: "🔥",
    },
    {
      title: "Video Explorer",
      desc: "You explored video learning.",
      icon: "🎥",
    },
    {
      title: "Notes User",
      desc: "You generated learning notes.",
      icon: "📒",
    },
  ];

  const activities = [
    {
      title: "Completed Quiz",
      time: "Recently",
      icon: "📝",
    },
    {
      title: "Generated Notes",
      time: "Recently",
      icon: "📒",
    },
    {
      title: "Continued Learning",
      time: "Recently",
      icon: "📚",
    },
  ];

  useEffect(() => {
    fetch("http://localhost:5000/api/progress")
      .then((res) => res.json())
      .then((data) => {
        setProgressData({
          quizzesAttempted: data.quizzesAttempted || 0,
          latestScore: data.latestScore || "0/0",
          courseCompleted: data.averageScore || 0,
          weakSubject: "Check Subject Performance",
          learningLevel:
            data.averageScore >= 75
              ? "Advanced"
              : data.averageScore >= 40
              ? "Intermediate"
              : "Beginner",
          streak: 6,
          assignmentsCompleted: 18,
        });
      })
      .catch((error) => {
        console.log("Progress fetch error:", error);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/subject-progress")
      .then((res) => res.json())
      .then((data) => {
        const colors = [
          "bg-blue-600",
          "bg-red-500",
          "bg-green-500",
          "bg-purple-500",
        ];

        const formattedData = data.subjectProgress.map((item, index) => ({
          subject: item.subject,
          score: item.score,
          color: colors[index % colors.length],
          action: `/quiz?topic=${item.subject}`,
          icon: "📚",
        }));

        setSubjectProgress(formattedData);
      })
      .catch((error) => {
        console.log("Subject progress fetch error:", error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-blue-50">
      <Navbar />

      <div className="p-4 md:p-8">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 md:p-8 rounded-3xl shadow mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Learning Progress 📈
          </h1>
          <p className="text-base md:text-lg">
            Track quiz performance, learning growth, weak subjects, and achievements.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-3xl shadow text-center hover:shadow-xl transition">
            <div className="text-4xl mb-3">📚</div>
            <h2 className="text-4xl font-bold text-blue-600">
              {progressData.courseCompleted}%
            </h2>
            <p className="mt-2 text-gray-700">Course Completion</p>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow text-center hover:shadow-xl transition">
            <div className="text-4xl mb-3">🏆</div>
            <h2 className="text-4xl font-bold text-green-600">
              {progressData.latestScore}
            </h2>
            <p className="mt-2 text-gray-700">Latest Quiz Score</p>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow text-center hover:shadow-xl transition">
            <div className="text-4xl mb-3">🔥</div>
            <h2 className="text-4xl font-bold text-orange-500">
              {progressData.streak}
            </h2>
            <p className="mt-2 text-gray-700">Day Learning Streak</p>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow text-center hover:shadow-xl transition">
            <div className="text-4xl mb-3">⭐</div>
            <h2 className="text-3xl font-bold text-purple-600">
              {progressData.learningLevel}
            </h2>
            <p className="mt-2 text-gray-700">Learning Level</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-3xl shadow">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-blue-700">
                Subject Performance
              </h2>
              <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                Click to improve
              </span>
            </div>

            <div className="space-y-5">
              {subjectProgress.length === 0 ? (
                <p className="text-gray-500">No quiz data available yet.</p>
              ) : (
                subjectProgress.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => navigate(item.action)}
                    className="p-4 rounded-2xl border border-gray-200 hover:bg-blue-50 cursor-pointer transition"
                  >
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold text-gray-800">
                        {item.icon} {item.subject}
                      </span>
                      <span className="font-bold text-gray-800">
                        {item.score}%
                      </span>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div
                        className={`${item.color} h-4 rounded-full`}
                        style={{ width: `${item.score}%` }}
                      ></div>
                    </div>

                    <p className="text-sm text-gray-500 mt-2">
                      Click here to practice and improve {item.subject}.
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow">
            <h2 className="text-2xl font-bold text-blue-700 mb-6">
              Student Analytics
            </h2>

            <div className="space-y-5 text-gray-700">
              <div className="flex justify-between border-b pb-3">
                <span>Total Quizzes Attempted</span>
                <span className="font-bold">{progressData.quizzesAttempted}</span>
              </div>

              <div className="flex justify-between border-b pb-3">
                <span>Weak Subject</span>
                <span className="font-bold text-red-500">
                  {progressData.weakSubject}
                </span>
              </div>

              <div className="flex justify-between border-b pb-3">
                <span>Assignments Completed</span>
                <span className="font-bold text-blue-600">
                  {progressData.assignmentsCompleted}
                </span>
              </div>

              <div className="flex justify-between border-b pb-3">
                <span>Student Status</span>
                <span className="font-bold text-purple-600">Active Learner</span>
              </div>
            </div>

            <div className="mt-8 bg-yellow-100 p-5 rounded-2xl">
              <h3 className="text-xl font-bold text-yellow-700 mb-2">
                Improvement Suggestion
              </h3>

              <p className="text-gray-700">
                Check your lowest subject score and practice quizzes daily to improve your performance.
              </p>

              <button
                onClick={() => navigate("/quiz")}
                className="mt-4 bg-yellow-500 text-white px-5 py-2 rounded-xl hover:bg-yellow-600 font-semibold"
              >
                Practice Quiz
              </button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-3xl shadow">
            <h2 className="text-2xl font-bold text-blue-700 mb-6">
              Achievement Badges 🏅
            </h2>

            <div className="grid sm:grid-cols-2 gap-4">
              {achievements.map((badge, index) => (
                <div
                  key={index}
                  onClick={() => {
                    if (badge.title === "First Quiz Completed") navigate("/quiz");
                    else if (badge.title === "Video Explorer") navigate("/videos");
                    else if (badge.title === "Notes User") navigate("/notes");
                    else if (badge.title === "Active Learner") navigate("/dashboard");
                  }}
                  className="border border-gray-200 p-4 rounded-2xl hover:bg-blue-50 hover:shadow-lg cursor-pointer transition"
                >
                  <div className="text-4xl mb-3">{badge.icon}</div>
                  <h3 className="font-bold text-gray-800">{badge.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">{badge.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow">
            <h2 className="text-2xl font-bold text-blue-700 mb-6">
              Recent Learning Activity
            </h2>

            <div className="space-y-4">
              {activities.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border border-gray-200 p-4 rounded-2xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{activity.icon}</div>
                    <div>
                      <h3 className="font-bold text-gray-800">
                        {activity.title}
                      </h3>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                  </div>

                  <span className="text-green-600 font-bold">Done</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate("/dashboard")}
              className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 font-semibold"
            >
              Continue Learning
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}