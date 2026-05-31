import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Profile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("smartgaonUser"));

  const stats = [
    {
      title: "Quizzes",
      value: "12",
      icon: "📝",
      color: "text-blue-600",
      path: "/quiz",
    },
    {
      title: "Progress",
      value: "68%",
      icon: "📈",
      color: "text-green-600",
      path: "/progress",
    },
    {
      title: "Day Streak",
      value: "6",
      icon: "🔥",
      color: "text-purple-600",
      path: "/progress",
    },
    {
      title: "Badges",
      value: "4",
      icon: "🏅",
      color: "text-orange-500",
      path: "/progress",
    },
  ];

  const badges = [
    { title: "Active Learner", icon: "🔥" },
    { title: "Quiz Starter", icon: "📝" },
    { title: "Video Explorer", icon: "🎥" },
    { title: "Notes User", icon: "📒" },
  ];

  const activities = [
    {
      title: "Completed Algebra Quiz",
      time: "Today",
      icon: "📝",
      path: "/quiz?topic=Algebra",
    },
    {
      title: "Generated Photosynthesis Notes",
      time: "Yesterday",
      icon: "📒",
      path: "/notes?topic=Photosynthesis",
    },
    {
      title: "Watched Computer Fundamentals Video",
      time: "2 Days Ago",
      icon: "🎥",
      path: "/videos?topic=Computer Fundamentals",
    },
  ];

  const quickActions = [
    {
      title: "Ask AI Tutor",
      desc: "Clear doubts in simple language.",
      icon: "🤖",
      path: "/ai-tutor",
    },
    {
      title: "Generate Notes",
      desc: "Create study notes instantly.",
      icon: "📒",
      path: "/notes",
    },
    {
      title: "Practice Quiz",
      desc: "Improve your weak topics.",
      icon: "📝",
      path: "/quiz",
    },
    {
      title: "Watch Videos",
      desc: "Search video lessons.",
      icon: "🎥",
      path: "/videos",
    },
  ];

  return (
    <div className="min-h-screen bg-blue-50">
      <Navbar />

      <div className="p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 md:p-8 rounded-3xl shadow mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Student Profile 👤
            </h1>
            <p className="text-base md:text-lg">
              View your learning details, achievements, progress, and recent
              activity.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-3xl shadow text-center">
              <div className="w-32 h-32 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center text-6xl mx-auto mb-4">
                👨‍🎓
              </div>

              <h2 className="text-3xl font-bold text-blue-700">
                {user?.fullName || "Student"}
              </h2>

              <p className="text-gray-600 mt-2 break-all">
                {user?.email || "student@example.com"}
              </p>

              <span className="inline-block mt-4 bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
                Active Learner
              </span>

              <button
                onClick={() => alert("Edit profile feature coming soon")}
                className="mt-5 w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 font-semibold"
              >
                Edit Profile
              </button>
            </div>

            <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow">
              <h2 className="text-2xl font-bold text-blue-700 mb-6">
                Academic Information
              </h2>

              <div className="grid md:grid-cols-2 gap-5">
                <div className="border p-4 rounded-2xl hover:bg-blue-50 transition">
                  <p className="text-gray-500">Class</p>
                  <h3 className="text-xl font-bold text-gray-800">
                    {user?.studentClass || "N/A"}
                  </h3>
                </div>

                <div className="border p-4 rounded-2xl hover:bg-blue-50 transition">
                  <p className="text-gray-500">Preferred Language</p>
                  <h3 className="text-xl font-bold text-gray-800">
                    {user?.language || "English"}
                  </h3>
                </div>

                <div className="border p-4 rounded-2xl hover:bg-blue-50 transition">
                  <p className="text-gray-500">Learning Level</p>
                  <h3 className="text-xl font-bold text-purple-600">
                    Intermediate
                  </h3>
                </div>

                <div className="border p-4 rounded-2xl hover:bg-blue-50 transition">
                  <p className="text-gray-500">Joined</p>
                  <h3 className="text-xl font-bold text-gray-800">2026</h3>
                </div>
              </div>

              <div className="mt-8">
                <div className="flex justify-between mb-2">
                  <span className="font-semibold text-gray-700">
                    Overall Learning Progress
                  </span>
                  <span className="font-bold text-blue-600">68%</span>
                </div>

                <div className="w-full bg-gray-200 h-4 rounded-full">
                  <div className="bg-blue-600 h-4 rounded-full w-[68%]"></div>
                </div>

                <p className="text-sm text-gray-500 mt-2">
                  Keep learning daily to reach the advanced level.
                </p>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {stats.map((item, index) => (
              <div
                key={index}
                onClick={() => navigate(item.path)}
                className="bg-white p-6 rounded-3xl shadow text-center hover:shadow-xl hover:-translate-y-1 transition cursor-pointer"
              >
                <div className="text-4xl mb-2">{item.icon}</div>
                <h2 className={`text-4xl font-bold ${item.color}`}>
                  {item.value}
                </h2>
                <p className="mt-2 text-gray-700">{item.title}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mt-8">
            <div className="bg-white p-6 rounded-3xl shadow">
              <h2 className="text-2xl font-bold text-blue-700 mb-6">
                Achievement Badges 🏅
              </h2>

              <div className="grid sm:grid-cols-2 gap-4">
                {badges.map((badge, index) => (
                  <div
                    key={index}
                    onClick={() => navigate("/progress")}
                    className="border border-gray-200 p-4 rounded-2xl hover:bg-blue-50 hover:shadow-lg cursor-pointer transition"
                  >
                    <div className="text-4xl mb-3">{badge.icon}</div>
                    <h3 className="font-bold text-gray-800">{badge.title}</h3>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow">
              <h2 className="text-2xl font-bold text-blue-700 mb-6">
                Recent Activity
              </h2>

              <div className="space-y-4">
                {activities.map((activity, index) => (
                  <div
                    key={index}
                    onClick={() => navigate(activity.path)}
                    className="flex items-center justify-between border border-gray-200 p-4 rounded-2xl hover:bg-blue-50 cursor-pointer transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{activity.icon}</div>
                      <div>
                        <h3 className="font-bold text-gray-800">
                          {activity.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {activity.time}
                        </p>
                      </div>
                    </div>

                    <span className="text-green-600 font-bold">Done</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow mt-8">
            <h2 className="text-2xl font-bold text-blue-700 mb-6">
              Quick Actions
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => navigate(action.path)}
                  className="text-left border border-gray-200 p-5 rounded-2xl hover:bg-blue-50 hover:shadow-lg transition"
                >
                  <div className="text-4xl mb-3">{action.icon}</div>
                  <h3 className="font-bold text-gray-800">{action.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{action.desc}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}