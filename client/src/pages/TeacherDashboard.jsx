import Navbar from "../components/Navbar";

export default function TeacherDashboard() {
  const stats = [
    { title: "Total Students", value: 120, icon: "👥", color: "text-blue-600" },
    { title: "Active Students", value: 86, icon: "✅", color: "text-green-600" },
    { title: "Average Score", value: "72%", icon: "📊", color: "text-purple-600" },
    { title: "Weak Subject", value: "Math", icon: "⚠️", color: "text-red-500" },
  ];

  const subjects = [
    { name: "Science", score: 82 },
    { name: "Mathematics", score: 46 },
    { name: "English", score: 74 },
    { name: "Computer", score: 88 },
  ];

  const activities = [
    "Rahul attempted Science Quiz",
    "Priya completed Computer Fundamentals",
    "Amit needs help in Mathematics",
    "Sneha used AI Tutor for English",
    "Karan completed Digital Awareness course",
  ];

  return (
    <div className="min-h-screen bg-blue-50">
      <Navbar />

      <div className="p-8">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white p-8 rounded-3xl shadow mb-8">
          <h1 className="text-4xl font-bold mb-3">
            Teacher Dashboard 👨‍🏫
          </h1>
          <p className="text-lg">
            Monitor student performance, weak subjects, activities, and learning progress.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {stats.map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-3xl shadow text-center">
              <div className="text-5xl mb-3">{item.icon}</div>
              <h2 className={`text-4xl font-bold ${item.color}`}>
                {item.value}
              </h2>
              <p className="mt-2 text-gray-700">{item.title}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-3xl shadow">
            <h2 className="text-2xl font-bold text-blue-700 mb-6">
              Subject Performance
            </h2>

            <div className="space-y-5">
              {subjects.map((subject, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span>{subject.name}</span>
                    <span>{subject.score}%</span>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                      className={`h-4 rounded-full ${
                        subject.score < 50 ? "bg-red-500" : "bg-blue-600"
                      }`}
                      style={{ width: `${subject.score}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow">
            <h2 className="text-2xl font-bold text-blue-700 mb-6">
              Recent Student Activity
            </h2>

            <ul className="space-y-4 text-gray-700">
              {activities.map((item, index) => (
                <li key={index} className="bg-blue-50 p-3 rounded-xl">
                  ✅ {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-yellow-100 p-6 rounded-3xl shadow mt-8">
          <h2 className="text-2xl font-bold text-yellow-700 mb-2">
            Teacher Recommendation
          </h2>
          <p className="text-gray-700">
            Mathematics performance is low. Conduct extra practice sessions and recommend AI Tutor support for weak students.
          </p>
        </div>
      </div>
    </div>
  );
}