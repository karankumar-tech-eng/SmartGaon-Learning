import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Courses() {
  const navigate = useNavigate();

  const courses = [
    {
      title: "Science Basics",
      description: "Physics, chemistry, biology basics in simple language.",
      level: "Beginner",
      lessons: 12,
      progress: 65,
      icon: "🔬",
      searchTopic: "Science Basics Physics Chemistry Biology",
    },
    {
      title: "Mathematics Practice",
      description: "Arithmetic, algebra, geometry, and problem solving.",
      level: "Beginner",
      lessons: 18,
      progress: 40,
      icon: "➗",
      searchTopic: "Mathematics Algebra Geometry Arithmetic",
    },
    {
      title: "Computer Fundamentals",
      description: "Computer basics, internet, typing, and digital skills.",
      level: "Beginner",
      lessons: 10,
      progress: 80,
      icon: "💻",
      searchTopic: "Computer Fundamentals Internet Digital Skills",
    },
    {
      title: "English Communication",
      description: "Grammar, vocabulary, speaking, and writing practice.",
      level: "Beginner",
      lessons: 15,
      progress: 55,
      icon: "📘",
      searchTopic: "English Communication Grammar Vocabulary Speaking",
    },
    {
      title: "Career Skills",
      description: "Resume building, interviews, exams, and career planning.",
      level: "Intermediate",
      lessons: 8,
      progress: 25,
      icon: "🚀",
      searchTopic: "Career Skills Resume Interview Career Planning",
    },
    {
      title: "Digital Awareness",
      description: "Online safety, digital payments, and government services.",
      level: "Beginner",
      lessons: 9,
      progress: 70,
      icon: "🌐",
      searchTopic: "Digital Awareness Online Safety Digital Payments",
    },
  ];

  const continueLearning = (searchTopic) => {
    navigate(`/videos?topic=${encodeURIComponent(searchTopic)}`);
  };

  return (
    <div className="min-h-screen bg-blue-50">
      <Navbar />

      <div className="p-4 md:p-8">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white p-6 md:p-8 rounded-3xl shadow mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Learning Courses 📚
          </h1>

          <p className="text-base md:text-lg max-w-3xl">
            Explore beginner-friendly courses designed for rural students with
            simple explanations and practical learning.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-3xl shadow hover:shadow-xl hover:-translate-y-1 transition"
            >
              <div className="text-5xl mb-4">{course.icon}</div>

              <h2 className="text-2xl font-bold text-blue-700 mb-2">
                {course.title}
              </h2>

              <p className="text-gray-700 mb-4">{course.description}</p>

              <div className="flex justify-between text-sm text-gray-600 mb-3">
                <span>{course.lessons} Lessons</span>
                <span>{course.level}</span>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1 text-gray-700">
                  <span>Progress</span>
                  <span>{course.progress}%</span>
                </div>

                <div className="w-full bg-gray-200 h-3 rounded-full">
                  <div
                    className="bg-blue-600 h-3 rounded-full"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>

              <button
                onClick={() => continueLearning(course.searchTopic)}
                className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 font-semibold"
              >
                Continue Learning
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}