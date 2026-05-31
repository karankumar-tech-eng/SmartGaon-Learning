const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
require("dotenv").config();
const Groq = require("groq-sdk").default;
const videoRoutes = require("./routes/videoRoutes");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/videos", videoRoutes);

const usersFilePath = path.join(__dirname, "../data/users.json");
const scoresFilePath = path.join(__dirname, "../data/scores.json");

const getUsers = () => JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
const saveUsers = (users) =>
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

const getScores = () => JSON.parse(fs.readFileSync(scoresFilePath, "utf-8"));
const saveScores = (scores) =>
  fs.writeFileSync(scoresFilePath, JSON.stringify(scores, null, 2));

app.get("/", (req, res) => {
  res.send("SmartGaon Learning Backend Running");
});

app.post("/api/auth/register", async (req, res) => {
  try {
    const { fullName, email, password, studentClass, language, role } = req.body;
    const users = getUsers();

    if (users.find((user) => user.email === email)) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: Date.now().toString(),
      fullName,
      email,
      password: hashedPassword,
      studentClass,
      language,
      role,
    };

    users.push(newUser);
    saveUsers(users);

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser.id,
        fullName,
        email,
        studentClass,
        language,
        role,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Registration failed" });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const users = getUsers();

    const user = users.find((user) => user.email === email);

    if (!user) return res.status(400).json({ message: "Invalid email" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      "smartgaon_secret_key",
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        studentClass: user.studentClass,
        language: user.language,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Login failed" });
  }
});

app.post("/api/ask-ai", async (req, res) => {
  try {
    const { question } = req.body;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content:
            "You are SmartGaon AI Tutor. Explain answers in very simple language for rural students and beginner learners. Answer in Hindi if the question is Hindi. Answer in English if the question is English.",
        },
        {
          role: "user",
          content: question,
        },
      ],
    });

    res.json({ answer: completion.choices[0].message.content });
  } catch (error) {
    console.log(error);
    res.json({ answer: "AI service is temporarily busy. Please try again later." });
  }
});

app.post("/api/generate-quiz", async (req, res) => {
  try {
    const { topic } = req.body;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0.1,
      messages: [
        {
          role: "system",
          content:
            'Return ONLY valid JSON array. No markdown. No explanation. Format: [{"question":"Question text","options":["option 1","option 2","option 3","option 4"],"answer":"option 1"}]. Answer must exactly match one option.',
        },
        {
          role: "user",
          content: `Generate exactly 10 simple MCQ questions on topic: ${topic}`,
        },
      ],
    });

    let quizText = completion.choices[0].message.content.trim();

    quizText = quizText.replace(/```json/g, "").replace(/```/g, "").trim();

    const startIndex = quizText.indexOf("[");
    const endIndex = quizText.lastIndexOf("]");

    if (startIndex === -1 || endIndex === -1) {
      throw new Error("No JSON array found");
    }

    const cleanQuizText = quizText.substring(startIndex, endIndex + 1);
    const quiz = JSON.parse(cleanQuizText);

    res.json({ quiz });
  } catch (error) {
    console.log("Quiz Error:", error.message);
    res.status(500).json({ message: "Quiz generation failed" });
  }
});

app.post("/api/save-score", (req, res) => {
  try {
    const { name, topic, score, total } = req.body;
    const scores = getScores();

    const newScore = {
      id: Date.now().toString(),
      name,
      topic,
      score,
      total,
      date: new Date().toLocaleString(),
    };

    scores.push(newScore);
    saveScores(scores);

    res.json({ message: "Score saved successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to save score" });
  }
});

app.get("/api/leaderboard", (req, res) => {
  try {
    const scores = getScores();

    const leaderboard = scores
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);

    res.json({ leaderboard });
  } catch (error){
    console.log(error);
    res.status(500).json({ message: "Failed to load leaderboard" });
  }
});

app.get("/api/progress", (req, res) => {
  try {
    const scores = getScores();

    if (scores.length === 0) {
      return res.json({
        quizzesAttempted: 0,
        latestScore: "0/0",
        averageScore: 0,
      });
    }

    const latest = scores[scores.length - 1];

    const totalMarks = scores.reduce(
      (sum, item) => sum + (item.score / item.total) * 100,
      0
    );

    const averageScore = Math.round(totalMarks / scores.length);

    res.json({
      quizzesAttempted: scores.length,
      latestScore: `${latest.score}/${latest.total}`,
      averageScore,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to load progress",
    });
  }
});

app.get("/api/subject-progress", (req, res) => {
  try {
    const scores = getScores();

    const subjectMap = {};

    scores.forEach((item) => {
      const subject = item.topic || "General";
      const percent = Math.round((item.score / item.total) * 100);

      if (!subjectMap[subject]) {
        subjectMap[subject] = [];
      }

      subjectMap[subject].push(percent);
    });

    const subjectProgress = Object.keys(subjectMap).map((subject) => {
      const avg =
        subjectMap[subject].reduce((sum, val) => sum + val, 0) /
        subjectMap[subject].length;

      return {
        subject,
        score: Math.round(avg),
      };
    });

    res.json({ subjectProgress });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to load subject progress" });
  }
});

app.post("/api/generate-notes", async (req, res) => {
  try {
    const { topic } = req.body;

    if (!topic) {
      return res.status(400).json({ message: "Topic is required" });
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content:
"Generate detailed educational study notes for students. Use proper headings, bullet points, key concepts, examples, advantages, disadvantages, applications, and a conclusion. Do not write casual conversation topics. Return clean notes only.",
           
        },
        {
          role: "user",
          content: `Create detailed study notes on: ${topic}`,
        },
      ],
    });

    res.json({
      notes: completion.choices[0].message.content,
    });
  } catch (error) {
    console.log("Notes Error:", error);
    res.status(500).json({ message: "Notes generation failed" });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});