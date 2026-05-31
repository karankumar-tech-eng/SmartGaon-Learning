import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Notifications() {
const navigate = useNavigate();

const [notifications, setNotifications] = useState([
{
title: "Assignment Reminder",
message: "Your Mathematics assignment is due soon.",
type: "Assignment",
icon: "📝",
time: "10 mins ago",
unread: true,
path: "/assignments",
},
{
title: "Quiz Available",
message: "New Science quiz is available for practice.",
type: "Quiz",
icon: "📘",
time: "30 mins ago",
unread: true,
path: "/quiz?topic=Science",
},
{
title: "Scholarship Alert",
message: "Post Matric Scholarship application is open.",
type: "Scholarship",
icon: "🎓",
time: "2 hours ago",
unread: false,
path: "/scholarship",
},
{
title: "Achievement Unlocked",
message: "You completed a 6 day learning streak.",
type: "Achievement",
icon: "🏆",
time: "Yesterday",
unread: false,
path: "/profile",
},
]);

const [filter, setFilter] = useState("All");

const unreadCount = notifications.filter(
(item) => item.unread
).length;

const filteredNotifications =
filter === "All"
? notifications
: notifications.filter(
(item) => item.type === filter
);

const markAsRead = (index) => {
const updated = [...notifications];
updated[index].unread = false;
setNotifications(updated);
};

const clearAll = () => {
setNotifications([]);
};

return ( <div className="min-h-screen bg-blue-50"> <Navbar />

```
  <div className="p-4 md:p-8">
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 md:p-8 rounded-3xl shadow mb-8">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Notifications 🔔
          </h1>

          <p className="text-base md:text-lg">
            Stay updated with assignments,
            quizzes, scholarships, and achievements.
          </p>
        </div>

        <div className="bg-white text-blue-700 px-5 py-3 rounded-2xl font-bold">
          {unreadCount} Unread
        </div>
      </div>
    </div>

    <div className="flex flex-wrap gap-3 mb-6">
      {[
        "All",
        "Assignment",
        "Quiz",
        "Scholarship",
        "Achievement",
      ].map((item) => (
        <button
          key={item}
          onClick={() => setFilter(item)}
          className={`px-4 py-2 rounded-xl font-semibold ${
            filter === item
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700"
          }`}
        >
          {item}
        </button>
      ))}

      <button
        onClick={clearAll}
        className="ml-auto bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600"
      >
        Clear All
      </button>
    </div>

    <div className="max-w-5xl mx-auto space-y-5">
      {filteredNotifications.map((item, index) => (
        <div
          key={index}
          className={`bg-white p-5 rounded-3xl shadow hover:shadow-xl transition cursor-pointer border-l-8 ${
            item.unread
              ? "border-blue-600"
              : "border-gray-300"
          }`}
        >
          <div className="flex justify-between items-start gap-4">
            <div
              className="flex gap-4 flex-1"
              onClick={() => navigate(item.path)}
            >
              <div className="text-5xl">
                {item.icon}
              </div>

              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <h2 className="text-xl font-bold text-blue-700">
                    {item.title}
                  </h2>

                  {item.unread && (
                    <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-bold">
                      NEW
                    </span>
                  )}
                </div>

                <p className="text-gray-700 mt-1">
                  {item.message}
                </p>

                <p className="text-sm text-gray-500 mt-2">
                  {item.time}
                </p>
              </div>
            </div>

            {item.unread && (
              <button
                onClick={() => markAsRead(index)}
                className="bg-green-500 text-white px-3 py-2 rounded-xl hover:bg-green-600"
              >
                Mark Read
              </button>
            )}
          </div>
        </div>
      ))}

      {filteredNotifications.length === 0 && (
        <div className="bg-white p-10 rounded-3xl shadow text-center">
          <div className="text-6xl mb-4">🔕</div>
          <h2 className="text-2xl font-bold text-gray-700">
            No Notifications
          </h2>
        </div>
      )}
    </div>
  </div>
</div>
);
}
