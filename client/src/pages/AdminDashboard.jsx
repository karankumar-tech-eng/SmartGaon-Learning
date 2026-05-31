import Navbar from "../components/Navbar";

const AdminDashboard = () => {
  const stats = [
    { title: "Total Students", value: "1,245" },
    { title: "Total Teachers", value: "86" },
    { title: "Courses", value: "32" },
    { title: "Active Villages", value: "18" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <Navbar />

      <div className="p-6">

        <h1 className="text-3xl font-bold mb-2">
          Admin Dashboard
        </h1>

        <p className="text-slate-400 mb-8">
          Manage students, teachers, courses,
          and platform activity.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-xl"
            >
              <p className="text-slate-400">
                {item.title}
              </p>

              <h2 className="text-3xl font-bold mt-2 text-blue-400">
                {item.value}
              </h2>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-xl">

          <h2 className="text-xl font-semibold mb-4">
            Recent Platform Activity
          </h2>

          <ul className="space-y-3 text-slate-300">
            <li>
              ✅ New student registered from Bihar village center
            </li>

            <li>
              📘 Teacher uploaded Mathematics assignment
            </li>

            <li>
              🏆 Student completed quiz with 92% score
            </li>

            <li>
              🎓 Scholarship application submitted
            </li>
          </ul>

        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;