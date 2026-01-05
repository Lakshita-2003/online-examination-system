const express = require("express");
const router = express.Router();

const {
  createExam,
  addQuestion,
  getAllExams,
  getExamQuestions,
} = require("../controllers/examController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

// Admin routes
router.post("/", protect, adminOnly, createExam);
router.post("/:examId/question", protect, adminOnly, addQuestion);

// Student routes
router.get("/", protect, getAllExams);
router.get("/:examId", protect, getExamQuestions);

module.exports = router;
