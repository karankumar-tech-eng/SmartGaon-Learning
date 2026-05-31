import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function VideoLearning() {
  const [query, setQuery] = useState("");
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();

  const popularTopics = [
    "Operating System",
    "DBMS",
    "Computer Networks",
    "Physics",
    "Chemistry",
    "Biology",
    "Mathematics",
    "Artificial Intelligence",
    "History",
    "Geography",
  ];

  const searchVideos = async (searchTopic = query) => {
    if (!searchTopic.trim()) {
      alert("Enter a topic to search videos");
      return;
    }

    setLoading(true);
    setVideos([]);
    setSelectedVideo(null);

    try {
      const res = await fetch(
        `http://localhost:5000/api/videos/search?q=${encodeURIComponent(
          searchTopic
        )}`
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to fetch videos");
        return;
      }

      setVideos(data);
      setSelectedVideo(data[0]);
      setQuery(searchTopic);
    } catch (error) {
      console.log(error);
      alert("Backend not connected or video API failed");
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setQuery("");
    setVideos([]);
    setSelectedVideo(null);
  };

  useEffect(() => {
    const topicFromUrl = searchParams.get("topic");

    if (topicFromUrl) {
      searchVideos(topicFromUrl);
    }
  }, []);

  return (
    <div className="min-h-screen bg-blue-50">
      <Navbar />

      <div className="p-4 md:p-8">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 md:p-8 rounded-3xl shadow mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            SmartGaon Video Learning 🎥
          </h1>
          <p className="text-base md:text-lg">
            Search any topic and learn through simple educational videos inside
            SmartGaon.
          </p>
        </div>

        <div className="bg-white p-5 md:p-6 rounded-3xl shadow mb-8">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">
            Search Learning Videos 🔍
          </h2>

          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search topic, example: Operating System"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") searchVideos();
              }}
              className="flex-1 border border-gray-300 p-4 rounded-xl text-black bg-white outline-none focus:ring-2 focus:ring-purple-400"
            />

            <button
              onClick={() => searchVideos()}
              disabled={loading}
              className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 disabled:bg-gray-400 font-semibold"
            >
              {loading ? "Searching..." : "Search Videos"}
            </button>

            <button
              onClick={clearSearch}
              className="bg-red-500 text-white px-6 py-3 rounded-xl hover:bg-red-600 font-semibold"
            >
              Clear
            </button>
          </div>

          <div className="flex flex-wrap gap-3 mt-5">
            {popularTopics.map((topic, index) => (
              <button
                key={index}
                onClick={() => searchVideos(topic)}
                className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full hover:bg-blue-200 font-medium"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

        {loading && (
          <div className="bg-white p-6 rounded-3xl shadow mb-8 text-center">
            <div className="text-4xl mb-3">⏳</div>
            <h2 className="text-xl font-bold text-purple-700">
              Searching videos...
            </h2>
            <p className="text-gray-600 mt-2">
              Finding best learning videos for students.
            </p>
          </div>
        )}

        {!loading && selectedVideo && (
          <div className="bg-white p-5 md:p-6 rounded-3xl shadow mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Now Learning
            </h2>

            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="aspect-video rounded-2xl overflow-hidden bg-black">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${selectedVideo.id.videoId}`}
                    title={selectedVideo.snippet.title}
                    allowFullScreen
                  ></iframe>
                </div>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-2xl p-5">
                <span className="inline-block bg-purple-600 text-white px-3 py-1 rounded-full text-sm mb-3">
                  SmartGaon Lesson
                </span>

                <h3 className="text-xl font-bold text-gray-900">
                  {selectedVideo.snippet.title}
                </h3>

                <p className="text-gray-600 mt-3">
                  Channel: {selectedVideo.snippet.channelTitle}
                </p>

                <p className="text-gray-700 mt-4 line-clamp-5">
                  {selectedVideo.snippet.description ||
                    "Educational video selected for student learning."}
                </p>
              </div>
            </div>
          </div>
        )}

        {!loading && videos.length > 0 && (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-5">
              Recommended Lessons
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video, index) => (
                <div
                  key={index}
                  className="bg-white rounded-3xl shadow hover:shadow-xl transition overflow-hidden"
                >
                  <img
                    src={video.snippet.thumbnails.high.url}
                    alt={video.snippet.title}
                    className="w-full h-48 object-cover"
                  />

                  <div className="p-5">
                    <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mb-3">
                      Learning Video
                    </span>

                    <h3 className="text-lg font-bold text-gray-900 line-clamp-2">
                      {video.snippet.title}
                    </h3>

                    <p className="text-gray-600 mt-2 text-sm">
                      {video.snippet.channelTitle}
                    </p>

                    <button
                      onClick={() => {
                        setSelectedVideo(video);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="mt-5 w-full bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700 font-semibold"
                    >
                      Watch in SmartGaon
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {!loading && videos.length === 0 && (
          <div className="bg-white p-8 rounded-3xl shadow text-center">
            <div className="text-5xl mb-4">📚</div>
            <h2 className="text-2xl font-bold text-gray-800">
              Search any topic to start learning
            </h2>
            <p className="text-gray-600 mt-2">
              Example: Operating System, Photosynthesis, Algebra, DBMS, AI.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}