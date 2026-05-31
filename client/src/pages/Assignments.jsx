import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function Assignments() {
  const navigate = useNavigate();
  const assignments = [
    {
      title: "Science: Photosynthesis Notes",
      subject: "Science",
      dueDate: "25 May 2026",
      status: "Pending",
    },
    {
      title: "Math: Algebra Practice",
      subject: "Mathematics",
      dueDate: "27 May 2026",
      status: "Pending",
    },
    {
      title: "English: Tenses Worksheet",
      subject: "English",
      dueDate: "Completed",
      status: "Completed",
    },
  ];

  return (
    <div className="min-h-screen bg-blue-50">
      <Navbar />

      <div className="p-8">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white p-8 rounded-3xl shadow mb-8">
          <h1 className="text-4xl font-bold mb-3">Assignments 📝</h1>
          <p className="text-lg">Track homework, practice tasks, and learning activities.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {assignments.map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-3xl shadow">
              <h2 className="text-2xl font-bold text-blue-700 mb-2">
                {item.title}
              </h2>

              <p className="text-gray-700 mb-2">
                <strong>Subject:</strong> {item.subject}
              </p>

              <p className="text-gray-700 mb-4">
                <strong>Due:</strong> {item.dueDate}
              </p>

              <div className="flex gap-3 mt-4">
  <button
    className={`px-4 py-2 rounded-xl font-semibold ${
      item.status === "Completed"
        ? "bg-green-100 text-green-700"
        : "bg-yellow-100 text-yellow-700"
    }`}
  >
    {item.status}
  </button>

 <button
  className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
  onClick={() =>
    item.subject === "Mathematics"
      ? navigate(`/quiz?topic=${encodeURIComponent(item.title)}`)
      : navigate(`/notes?topic=${encodeURIComponent(item.title)}`)
  }
>
  View Task
</button>
</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}