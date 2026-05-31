import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function AITutor() {
  const defaultMessage = [
    {
      type: "ai",
      text: "Hello! I am your SmartGaon AI Tutor. Ask me any doubt.",
    },
  ];

  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState(defaultMessage);
  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const savedChats = localStorage.getItem("smartgaonChat");

    if (savedChats) {
      setMessages(JSON.parse(savedChats));
    }
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  const handleAsk = async () => {
    if (question.trim() === "" || loading) return;

    const userQuestion = question;

    const userMessage = {
      type: "user",
      text: userQuestion,
    };

    const newMessages = [...messages, userMessage];

    setMessages(newMessages);
    setQuestion("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/ask-ai",
        {
          question: userQuestion,
        }
      );

      const aiMessage = {
        type: "ai",
        text: response.data.answer,
      };

      const finalMessages = [...newMessages, aiMessage];

      setMessages(finalMessages);

      localStorage.setItem(
        "smartgaonChat",
        JSON.stringify(finalMessages)
      );
    } catch (error) {
      const errorMessages = [
        ...newMessages,
        {
          type: "ai",
          text: "AI failed. Please try again later.",
        },
      ];

      setMessages(errorMessages);

      localStorage.setItem(
        "smartgaonChat",
        JSON.stringify(errorMessages)
      );
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    localStorage.removeItem("smartgaonChat");
    setMessages(defaultMessage);
  };

  const startVoiceInput = () => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        "Voice recognition not supported. Please use Google Chrome."
      );
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-IN";
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.start();

    recognition.onresult = (event) => {
      const transcript =
        event.results[0][0].transcript;

      setQuestion(transcript);
    };

    recognition.onerror = (event) => {
      alert("Voice error: " + event.error);
    };

    recognitionRef.current = recognition;
  };

  const examples = [
    "Explain photosynthesis in simple words",
    "What is water cycle?",
    "Give me 5 English grammar tips",
    "Explain computer basics",
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="p-8">
        <div className="max-w-6xl mx-auto">

          <div className="bg-white/10 backdrop-blur-lg border border-white/10 p-8 rounded-3xl shadow-xl mb-8">
            <div className="flex justify-between items-center gap-4">

              <div>
                <h1 className="text-4xl font-bold mb-3">
                  Smart AI Tutor 🤖
                </h1>

                <p className="text-slate-300 max-w-3xl">
                  Ask any question and get simple,
                  student-friendly explanations.
                </p>
              </div>

              <button
                onClick={clearChat}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl"
              >
                Clear Chat
              </button>

            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">

            <div className="lg:col-span-2 bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl shadow-xl p-6">

              <div className="h-[420px] overflow-y-auto space-y-4 pr-2">

                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      msg.type === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[75%] p-4 rounded-2xl whitespace-pre-line leading-relaxed ${
                        msg.type === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-slate-800 text-slate-200 border border-white/10"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}

               {loading && (
  <div className="bg-slate-800 text-slate-300 border border-white/10 p-4 rounded-2xl w-fit flex gap-1">
    <span className="animate-bounce">●</span>
    <span className="animate-bounce delay-150">●</span>
    <span className="animate-bounce delay-300">●</span>
  </div>
)}

                <div ref={chatEndRef}></div>

              </div>

              <div className="mt-5 flex gap-3">

               <textarea
  className="flex-1 bg-slate-900 border border-white/10 rounded-2xl p-4 outline-none focus:border-blue-500 text-white h-24"
  placeholder="Ask your doubt here..."
  value={question}
  onChange={(e) => setQuestion(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAsk();
    }
  }}
/>

                <button
                  onClick={startVoiceInput}
                  className="bg-purple-600 hover:bg-purple-700 px-5 rounded-2xl font-semibold"
                >
                  🎤
                </button>

                <button
                  onClick={handleAsk}
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 px-6 rounded-2xl font-semibold"
                >
                  Ask
                </button>

              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl shadow-xl p-6">

              <h2 className="text-2xl font-bold mb-4">
                Quick Questions
              </h2>

              <div className="space-y-3">
                {examples.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setQuestion(item)}
                    className="w-full text-left bg-slate-900 border border-white/10 p-3 rounded-xl hover:bg-slate-800 text-slate-300"
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className="mt-8 bg-yellow-500/10 border border-yellow-400/20 p-4 rounded-2xl">

                <h3 className="font-bold text-yellow-300 mb-2">
                  Learning Tip
                </h3>

                <p className="text-slate-300">
                  Ask short and clear questions
                  for better answers.
                </p>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}