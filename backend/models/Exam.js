const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["mcq", "subjective"],
    required: true,
  },
  options: {
    type: [String],
    default: [],
  },
  correctAnswer: {
    type: String,
  },
});

const examSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    duration: {
      type: Number, // minutes
      required: true,
    },
    questions: [questionSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Exam", examSchema);
