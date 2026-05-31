import { BrowserRouter, Routes, Route } from "react-router-dom";
import VideoLearning from "./pages/VideoLearning";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AITutor from "./pages/AITutor";
import Quiz from "./pages/Quiz";
import Progress from "./pages/Progress";
import Career from "./pages/Career";
import ProtectedRoute from "./components/ProtectedRoute";
import Courses from "./pages/Courses";
import Scholarship from "./pages/Scholarship";
import TeacherDashboard from "./pages/TeacherDashboard";
import Profile from "./pages/Profile";
import Leaderboard from "./pages/Leaderboard";
import Notes from "./pages/Notes";
import Assignments from "./pages/Assignments";
import Notifications from "./pages/Notifications";
import Community from "./pages/Community";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <div className="bg-slate-950 min-h-screen text-white">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ai-tutor"
          element={
            <ProtectedRoute>
              <AITutor />
            </ProtectedRoute>
          }
        />

        <Route
          path="/quiz"
          element={
            <ProtectedRoute>
              <Quiz />
            </ProtectedRoute>
          }
        />

        <Route
          path="/progress"
          element={
            <ProtectedRoute>
              <Progress />
            </ProtectedRoute>
          }
        />

        <Route
          path="/career"
          element={
            <ProtectedRoute>
              <Career />
            </ProtectedRoute>
          }
        />

        <Route
  path="/courses"
  element={
    <ProtectedRoute>
      <Courses />
    </ProtectedRoute>
  }
/>
<Route
  path="/scholarship"
  element={
    <ProtectedRoute>
      <Scholarship />
    </ProtectedRoute>
  }
/>
<Route
  path="/teacher-dashboard"
  element={
    <ProtectedRoute>
      <TeacherDashboard />
    </ProtectedRoute>
  }
/>
<Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>
<Route
  path="/leaderboard"
  element={
    <ProtectedRoute>
      <Leaderboard />
    </ProtectedRoute>
  }
/>
<Route
  path="/notes"
  element={
    <ProtectedRoute>
      <Notes />
    </ProtectedRoute>
  }
/>
<Route
  path="/assignments"
  element={
    <ProtectedRoute>
      <Assignments />
    </ProtectedRoute>
  }
/>
<Route
  path="/notifications"
  element={
    <ProtectedRoute>
      <Notifications />
    </ProtectedRoute>
  }
/>

<Route
  path="/community"
  element={
    <ProtectedRoute>
      <Community />
    </ProtectedRoute>
  }
/>

<Route
  path="/videos"
  element={
    <ProtectedRoute>
      <VideoLearning />
    </ProtectedRoute>
  }
/>

<Route path="/admin" element={<AdminDashboard />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;