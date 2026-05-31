import { useState } from "react";
import Navbar from "../components/Navbar";
import jsPDF from "jspdf";

export default function Notes() {
  const [topic, setTopic] = useState("");
  const [language, setLanguage] = useState("English");
  const [generatedNotes, setGeneratedNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTopic, setActiveTopic] = useState("");

  const clearNotes = () => {
    setTopic("");
    setGeneratedNotes("");
    setActiveTopic("");
    setLanguage("English");
  };

  const copyNotes = () => {
  navigator.clipboard.writeText(generatedNotes);
  alert("Notes copied successfully!");
};

const downloadPDF = () => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text(activeTopic || "AI Notes", 10, 15);

  doc.setFontSize(12);

  const splitText = doc.splitTextToSize(generatedNotes, 180);
  doc.text(splitText, 10, 30);

  doc.save(`${activeTopic || "notes"}.pdf`);
};

  const generateNotes = async (selectedTopic = topic) => {
    if (!selectedTopic.trim()) {
      alert("Enter topic");
      return;
    }

    setLoading(true);
    setGeneratedNotes("");
    setActiveTopic(selectedTopic);

    try {
      const res = await fetch("http://localhost:5000/api/generate-notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic: `${selectedTopic}. Explain in ${language} language in simple student-friendly format.`,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Error generating notes");
        return;
      }

      setGeneratedNotes(data.notes || "No notes generated");
    } catch (error) {
      console.log(error);
      alert("Backend not connected or notes API failed");
    } finally {
      setLoading(false);
    }
  };

  const subjects = [
    "English Language and Literature",
    "Hindi Course A",
    "Hindi Course B",
    "Mathematics (Standard)",
    "Mathematics (Basic)",
    "Science",
    "Physics",
    "Chemistry",
    "Biology",
    "Social Science",
    "History",
    "Geography",
    "Political Science (Civics)",
    "Economics",
    "Information Technology (IT)",
    "Computer Applications",
    "Artificial Intelligence (AI)",
    "Sanskrit",
    "Urdu",
    "French",
    "German",
    "Painting",
    "Home Science",
    "Physical Education",
    "Music",
    "Dance",
    "Financial Market Management",
    "Retail",
    "Healthcare",
    "Agriculture",
    "Security",
    "Tourism",
    "Banking & Insurance",
    "Multimedia & Web Technology",
    "Data Entry Operations",
    "Marketing & Sales",
    "Beauty & Wellness",
    "Electronics & Hardware",
  ];

  const languages = [
    "English",
    "Hindi",
    "Hinglish",
    "Urdu",
    "Sanskrit",
    "French",
    "German",
  ];

  return (
    <div className="min-h-screen bg-blue-50">
      <Navbar />

      <div className="p-4 md:p-8">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 md:p-8 rounded-3xl shadow mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Student Notes 📒
          </h1>
          <p className="text-base md:text-lg">
            Generate simple AI notes in different languages for students.
          </p>
        </div>

        <div className="bg-white p-5 md:p-6 rounded-3xl shadow mb-8">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">
            AI Notes Generator ✨
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Enter topic name, example: Photosynthesis"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="md:col-span-2 border border-gray-300 p-4 rounded-xl text-black bg-white outline-none focus:ring-2 focus:ring-blue-400"
            />

            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="border border-gray-300 p-4 rounded-xl text-black bg-white outline-none focus:ring-2 focus:ring-blue-400"
            >
              {languages.map((lang, index) => (
                <option key={index} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <button
              onClick={() => generateNotes()}
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 disabled:bg-gray-400 font-semibold"
            >
              {loading ? "Generating..." : "Generate Notes"}
            </button>

            <button
              onClick={clearNotes}
              className="bg-red-500 text-white px-6 py-3 rounded-xl hover:bg-red-600 font-semibold"
            >
              Clear
            </button>
          </div>
        </div>

        {loading && (
          <div className="bg-white p-6 rounded-3xl shadow mb-8 text-center">
            <div className="text-4xl mb-3">⏳</div>
            <h2 className="text-xl font-bold text-blue-700">
              Generating notes...
            </h2>
            <p className="text-gray-600 mt-2">
              AI is preparing notes in {language}.
            </p>
          </div>
        )}

       {generatedNotes && !loading && (
  <div className="bg-white p-5 md:p-8 rounded-3xl shadow mb-8">
    <h2 className="text-2xl font-bold text-green-700 mb-2">
      AI Generated Notes
    </h2>

    <p className="text-gray-500 mb-4">
      Topic: {activeTopic} | Language: {language}
    </p>

    <div className="flex flex-wrap gap-3 mb-4">
      <button
        onClick={copyNotes}
        className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700"
      >
        📋 Copy Notes
      </button>

      <button
        onClick={downloadPDF}
        className="bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-700"
      >
        📄 Download PDF
      </button>
    </div>

    <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
      <p className="text-gray-800 leading-8 whitespace-pre-line">
        {generatedNotes}
      </p>
    </div>
  </div>
)}

        <h2 className="text-2xl font-bold text-gray-800 mb-5">
          Choose Subject / Topic
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {subjects.map((subject, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-3xl shadow hover:shadow-xl hover:-translate-y-1 transition"
            >
              <div className="text-4xl mb-4">📘</div>

              <h3 className="text-lg font-bold text-blue-700 min-h-[56px]">
                {subject}
              </h3>

              <p className="text-gray-600 mt-3 min-h-[72px]">
                Click below to generate simple notes for {subject}.
              </p>

              <button
                onClick={() => generateNotes(subject)}
                disabled={loading}
                className="mt-5 w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 disabled:bg-gray-400 font-semibold"
              >
                Read Notes
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}