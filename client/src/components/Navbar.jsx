import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("smartgaonRole");

  const linkClass =
    "text-slate-200 hover:text-blue-400 transition font-semibold text-sm";

  const handleLogout = () => {
    localStorage.removeItem("smartgaonUser");
    localStorage.removeItem("smartgaonToken");
    localStorage.removeItem("smartgaonRole");
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-lg border-b border-white/10 px-6 py-4 flex flex-wrap gap-4 justify-between items-center">
      <h1 className="text-2xl font-bold text-white whitespace-nowrap">
        SmartGaon Learning
      </h1>

      <div className="flex flex-wrap gap-4 items-center justify-end">
        {role === "Student" && (
          <>
            <Link to="/dashboard" className={linkClass}>Dashboard</Link>
            <Link to="/courses" className={linkClass}>Courses</Link>
            <Link to="/ai-tutor" className={linkClass}>AI Tutor</Link>
            <Link to="/videos" className={linkClass}>Videos</Link>
             <Link to="/notes" className={linkClass}>Notes</Link>
            <Link to="/quiz" className={linkClass}>Quiz</Link>
            <Link to="/assignments" className={linkClass}>Assignments</Link>
            <Link to="/progress" className={linkClass}>Progress</Link>
            <Link to="/scholarship" className={linkClass}>Scholarship</Link>
            <Link to="/profile" className={linkClass}>Profile</Link>
            <Link to="/notifications" className={linkClass}>Notifications</Link>
            <Link to="/community" className={linkClass}>Community</Link>
          </>
        )}

        {role === "Teacher" && (
          <>
            <Link to="/teacher-dashboard" className={linkClass}>Teacher Dashboard</Link>
            <Link to="/assignments" className={linkClass}>Assignments</Link>
            <Link to="/notes" className={linkClass}>Notes</Link>
            <Link to="/notifications" className={linkClass}>Notifications</Link>
          </>
        )}

        {role === "Admin" && (
          <>
            <Link to="/admin" className={linkClass}>Admin Dashboard</Link>
            <Link to="/leaderboard" className={linkClass}>Leaderboard</Link>
            <Link to="/community" className={linkClass}>Community</Link>
          </>
        )}

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 transition text-white px-5 py-2 rounded-xl font-semibold"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}