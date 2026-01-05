const Exam = require("../models/Exam");

// ============================
// CREATE EXAM (ADMIN)
// ============================
exports.createExam = async (req, res) => {
  try {
    const { title, duration } = req.body;

    if (!title || !duration) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const exam = await Exam.create({
      title,
      duration,
      questions: [],
    });

    res.status(201).json(exam);
  } catch (error) {
    console.error("CREATE EXAM ERROR 👉", error);
    res.status(500).json({ message: error.message });
  }
};

// ============================
// ADD QUESTION (ADMIN)
// ============================
exports.addQuestion = async (req, res) => {
  try {
    const { examId } = req.params;
    const { questionText, type, options, correctAnswer } = req.body;

    const exam = await Exam.findById(examId);
    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    exam.questions.push({
      questionText,
      type,
      options: type === "mcq" ? options : [],
      correctAnswer,
    });

    await exam.save();

    res.json({ message: "Question added successfully" });
  } catch (error) {
    console.error("ADD QUESTION ERROR 👉", error);
    res.status(500).json({ message: error.message });
  }
};

// ============================
// GET ALL EXAMS
// ============================
exports.getAllExams = async (req, res) => {
  try {
    const exams = await Exam.find();
    res.json(exams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ============================
// GET RANDOMIZED QUESTIONS
// ============================
exports.getExamQuestions = async (req, res) => {
  try {
    const { examId } = req.params;

    const exam = await Exam.findById(examId);
    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    const shuffled = exam.questions.sort(() => 0.5 - Math.random());

    res.json({
      title: exam.title,
      duration: exam.duration,
      questions: shuffled,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
