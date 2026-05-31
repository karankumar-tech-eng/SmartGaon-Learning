import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-blue-50">
      <nav className="flex justify-between items-center px-8 py-5 bg-white shadow-md">
        <h1 className="text-3xl font-bold text-blue-700">
          SmartGaon Learning
        </h1>

        <div className="flex gap-4">
          <Link to="/login" className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
            Login
          </Link>
          <Link to="/register" className="border border-blue-600 text-blue-600 px-5 py-2 rounded-lg hover:bg-blue-100">
            Register
          </Link>
        </div>
      </nav>

      <section className="text-center px-6 py-24">
        <h1 className="text-6xl font-bold text-blue-700 mb-6">
          AI-Powered Education for Rural India
        </h1>

        <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-10">
          SmartGaon Learning helps rural students access quality education through
          AI tutoring, quizzes, courses, scholarships, and progress tracking.
        </p>

        <div className="flex justify-center gap-5">
          <Link to="/register" className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg hover:bg-blue-700">
            Get Started
          </Link>

          <Link to="/login" className="border border-blue-600 text-blue-600 px-8 py-4 rounded-xl text-lg hover:bg-blue-100">
            Student Login
          </Link>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-2xl font-bold text-blue-600 mb-3">AI Tutor</h2>
          <p className="text-gray-700">
            Students can ask doubts and receive simple learning explanations.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-2xl font-bold text-blue-600 mb-3">Smart Quiz</h2>
          <p className="text-gray-700">
            Practice questions, calculate scores, and improve weak topics.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-2xl font-bold text-blue-600 mb-3">Scholarship Finder</h2>
          <p className="text-gray-700">
            Find scholarships and financial support for rural students.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-2xl font-bold text-blue-600 mb-3">Courses</h2>
          <p className="text-gray-700">
            Access subject-wise learning materials and beginner-friendly courses.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-2xl font-bold text-blue-600 mb-3">Progress Tracking</h2>
          <p className="text-gray-700">
            Track quiz scores, course progress, learning level, and performance.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-2xl font-bold text-blue-600 mb-3">Teacher Dashboard</h2>
          <p className="text-gray-700">
            Teachers can monitor student activity, average scores, and weak subjects.
          </p>
        </div>
      </section>

      <section className="bg-white mt-12 py-16 px-6 text-center">
        <h2 className="text-4xl font-bold text-blue-700 mb-4">
          Built for Social Impact
        </h2>

        <p className="text-gray-700 max-w-3xl mx-auto text-lg">
          This platform is designed to reduce the education gap in rural areas by
          providing accessible digital learning, scholarship guidance, and smart
          academic support.
        </p>
      </section>
    </div>
  );
}