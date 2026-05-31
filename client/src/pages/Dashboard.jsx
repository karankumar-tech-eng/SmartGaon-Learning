import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("smartgaonUser"));

  const cards = [
    {
      title: "AI Tutor",
      desc: "Ask questions and learn in simple language.",
      path: "/ai-tutor",
      icon: "🤖",
    },
      {
  title: "Video Learning",
  desc: "Search any topic and watch educational videos inside SmartGaon.",
  path: "/videos",
  icon: "🎥",
},
    {
      title: "Courses",
      desc: "Access subject-wise lessons and learning materials.",
      path: "/courses",
      icon: "📚",
    },
    {
      title: "Quiz",
      desc: "Practice MCQs and check your learning score.",
      path: "/quiz",
      icon: "📝",
    },
    {
      title: "Progress",
      desc: "Track learning performance and weak topics.",
      path: "/progress",
      icon: "📊",
    },
    {
      title: "Scholarship",
      desc: "Find scholarships and financial support.",
      path: "/scholarship",
      icon: "🎓",
    },
    {
      title: "Leaderboard",
      desc: "View top students, ranks, streaks, and badges.",
      path: "/leaderboard",
      icon: "🏆",
    },
    {
      title: "Notes",
      desc: "Read short subject-wise learning notes.",
      path: "/notes",
      icon: "📒",
    },
    {
      title: "Assignments",
      desc: "Track homework, pending tasks, and completed work.",
      path: "/assignments",
      icon: "📌",
    },
    {
      title: "Notifications",
      desc: "View quiz alerts, deadlines, and scholarship updates.",
      path: "/notifications",
      icon: "🔔",
    },
    {
      title: "Community",
      desc: "Ask doubts and learn with other students.",
      path: "/community",
      icon: "💬",
    },

  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="p-8">
        <div className="bg-white/10 backdrop-blur-lg border border-white/10 p-8 rounded-3xl shadow-xl mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Welcome, {user?.fullName || "Student"} 👋
          </h1>

          <p className="text-slate-300 text-lg">
            Class: {user?.studentClass || "N/A"} | Language:{" "}
            {user?.language || "English"}
          </p>

          <p className="mt-4 max-w-2xl text-slate-300">
            Continue your learning journey with SmartGaon Learning. Explore
            courses, practice quizzes, track progress, and find scholarships.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <Link
              key={index}
              to={card.path}
              className="bg-white/10 backdrop-blur-lg border border-white/10 p-6 rounded-3xl shadow-xl hover:bg-white/15 hover:-translate-y-1 transition"
            >
              <div className="text-5xl mb-4">{card.icon}</div>

              <h2 className="text-2xl font-bold text-blue-400 mb-2">
                {card.title}
              </h2>

              <p className="text-slate-300">{card.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}