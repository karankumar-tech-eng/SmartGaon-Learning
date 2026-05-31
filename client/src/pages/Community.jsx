import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Community() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedPost, setSelectedPost] = useState(null);
  const [showAskModal, setShowAskModal] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");
  const [newSubject, setNewSubject] = useState("Science");

  const [posts, setPosts] = useState([
    {
      student: "Raushan Kumar",
      subject: "Science",
      question: "Can anyone explain photosynthesis in simple words?",
      replies: 4,
      likes: 18,
      solved: true,
      time: "10 mins ago",
      avatar: "👨‍🎓",
      answers: [
        "Photosynthesis is the process where plants make their own food using sunlight.",
        "Plants use sunlight, water, and carbon dioxide to make glucose and oxygen.",
      ],
    },
    {
      student: "Priya Sharma",
      subject: "Mathematics",
      question: "How to solve basic algebra equations?",
      replies: 6,
      likes: 24,
      solved: false,
      time: "25 mins ago",
      avatar: "👩‍🎓",
      answers: [
        "Move numbers to one side and keep the variable on the other side.",
        "Example: x + 5 = 10, so x = 10 - 5 = 5.",
      ],
    },
    {
      student: "Amit Singh",
      subject: "Computer",
      question: "What is the difference between hardware and software?",
      replies: 3,
      likes: 15,
      solved: true,
      time: "1 hour ago",
      avatar: "👨‍💻",
      answers: [
        "Hardware means physical parts of a computer like keyboard and monitor.",
        "Software means programs and applications like browser, MS Word, and games.",
      ],
    },
  ]);

  const subjects = ["All", "Science", "Mathematics", "Computer", "English"];

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.question.toLowerCase().includes(search.toLowerCase()) ||
      post.student.toLowerCase().includes(search.toLowerCase()) ||
      post.subject.toLowerCase().includes(search.toLowerCase());

    const matchesFilter = filter === "All" || post.subject === filter;

    return matchesSearch && matchesFilter;
  });

  const likePost = (index) => {
    const updated = [...posts];
    updated[index].likes += 1;
    setPosts(updated);
  };

  const addQuestion = () => {
    if (!newQuestion.trim()) {
      alert("Please enter your question");
      return;
    }

    const user = JSON.parse(localStorage.getItem("smartgaonUser"));

    const newPost = {
      student: user?.fullName || "SmartGaon Student",
      subject: newSubject,
      question: newQuestion,
      replies: 0,
      likes: 0,
      solved: false,
      time: "Just now",
      avatar: "👨‍🎓",
      answers: [],
    };

    setPosts([newPost, ...posts]);
    setNewQuestion("");
    setNewSubject("Science");
    setShowAskModal(false);
  };

  return (
    <div className="min-h-screen bg-blue-50">
      <Navbar />

      <div className="p-4 md:p-8">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 md:p-8 rounded-3xl shadow mb-8">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-3">
                Community Discussion 💬
              </h1>
              <p className="text-base md:text-lg">
                Ask doubts, share answers, and learn together with SmartGaon
                students.
              </p>
            </div>

            <button
              onClick={() => setShowAskModal(true)}
              className="bg-white text-blue-700 px-6 py-3 rounded-xl font-bold hover:bg-blue-50"
            >
              Ask Question
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <div className="bg-white p-5 rounded-3xl shadow mb-6">
              <input
                type="text"
                placeholder="Search doubts by topic, student, or subject..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border border-gray-300 p-4 rounded-xl text-black bg-white outline-none focus:ring-2 focus:ring-blue-400"
              />

              <div className="flex flex-wrap gap-3 mt-4">
                {subjects.map((subject) => (
                  <button
                    key={subject}
                    onClick={() => setFilter(subject)}
                    className={`px-4 py-2 rounded-xl font-semibold ${
                      filter === subject
                        ? "bg-blue-600 text-white"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {subject}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-5">
              {filteredPosts.map((post, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-3xl shadow hover:shadow-xl transition"
                >
                  <div className="flex justify-between items-start mb-4 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="text-4xl">{post.avatar}</div>

                      <div>
                        <h2 className="text-xl font-bold text-blue-700">
                          {post.student}
                        </h2>
                        <p className="text-sm text-gray-500">{post.time}</p>
                      </div>
                    </div>

                    <div className="flex gap-2 flex-wrap justify-end">
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                        {post.subject}
                      </span>

                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          post.solved
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {post.solved ? "Solved" : "Unsolved"}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-800 text-lg mb-5">{post.question}</p>

                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => likePost(index)}
                      className="bg-pink-100 text-pink-700 px-4 py-2 rounded-xl hover:bg-pink-200"
                    >
                      👍 {post.likes} Likes
                    </button>

                    <button
                      onClick={() => setSelectedPost(post)}
                      className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700"
                    >
                      View {post.replies} Replies
                    </button>

                    <button
                      onClick={() =>
                        navigate(
                          `/ai-tutor?question=${encodeURIComponent(
                            post.question
                          )}`
                        )
                      }
                      className="bg-purple-600 text-white px-5 py-2 rounded-xl hover:bg-purple-700"
                    >
                      Ask AI
                    </button>
                  </div>
                </div>
              ))}

              {filteredPosts.length === 0 && (
                <div className="bg-white p-10 rounded-3xl shadow text-center">
                  <div className="text-6xl mb-4">🔍</div>
                  <h2 className="text-2xl font-bold text-gray-700">
                    No discussions found
                  </h2>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl shadow">
              <h2 className="text-2xl font-bold text-blue-700 mb-4">
                Trending Topics 🔥
              </h2>

              <div className="space-y-3">
                {["Photosynthesis", "Algebra", "Computer Basics", "Scholarship"].map(
                  (topic) => (
                    <button
                      key={topic}
                      onClick={() => setSearch(topic)}
                      className="w-full text-left bg-blue-50 text-blue-700 px-4 py-3 rounded-xl hover:bg-blue-100"
                    >
                      #{topic}
                    </button>
                  )
                )}
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow">
              <h2 className="text-2xl font-bold text-blue-700 mb-4">
                Community Stats
              </h2>

              <div className="space-y-3 text-gray-700">
                <div className="flex justify-between">
                  <span>Total Doubts</span>
                  <strong>{posts.length}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Solved Doubts</span>
                  <strong>{posts.filter((p) => p.solved).length}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Active Students</span>
                  <strong>28</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        {selectedPost && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white text-black max-w-3xl w-full rounded-3xl shadow-2xl p-6 md:p-8 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start gap-4 mb-5">
                <div>
                  <h2 className="text-2xl font-bold text-blue-700">
                    Discussion Details
                  </h2>
                  <p className="text-gray-500">{selectedPost.subject}</p>
                </div>

                <button
                  onClick={() => setSelectedPost(null)}
                  className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600"
                >
                  Close
                </button>
              </div>

              <div className="bg-blue-50 p-5 rounded-2xl mb-5">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {selectedPost.question}
                </h3>
                <p className="text-gray-600">Asked by {selectedPost.student}</p>
              </div>

              <h3 className="text-xl font-bold text-blue-700 mb-4">
                Replies
              </h3>

              <div className="space-y-3">
                {selectedPost.answers.length > 0 ? (
                  selectedPost.answers.map((answer, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-2xl">
                      <p className="text-gray-700">{answer}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No replies yet.</p>
                )}
              </div>

              <button
                onClick={() =>
                  navigate(
                    `/ai-tutor?question=${encodeURIComponent(
                      selectedPost.question
                    )}`
                  )
                }
                className="mt-6 w-full bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700 font-semibold"
              >
                Ask AI Tutor About This
              </button>
            </div>
          </div>
        )}

        {showAskModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white text-black max-w-2xl w-full rounded-3xl shadow-2xl p-6 md:p-8">
              <h2 className="text-2xl font-bold text-blue-700 mb-5">
                Ask a New Question
              </h2>

              <select
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
                className="w-full border border-gray-300 p-4 rounded-xl mb-4"
              >
                {subjects
                  .filter((subject) => subject !== "All")
                  .map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
              </select>

              <textarea
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                placeholder="Write your doubt here..."
                className="w-full border border-gray-300 p-4 rounded-xl h-32 outline-none focus:ring-2 focus:ring-blue-400"
              ></textarea>

              <div className="flex gap-3 mt-5">
                <button
                  onClick={addQuestion}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 font-semibold"
                >
                  Post Question
                </button>

                <button
                  onClick={() => setShowAskModal(false)}
                  className="flex-1 bg-gray-500 text-white py-3 rounded-xl hover:bg-gray-600 font-semibold"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}