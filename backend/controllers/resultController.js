const Exam = require("../models/Exam");
const Result = require("../models/Result");

exports.submitExam = async (req, res) => {
  try {
    const { examId, answers } = req.body;

    const exam = await Exam.findById(examId);
    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    let score = 0;
    let evaluatedAnswers = [];

    exam.questions.forEach((question) => {
      const userAnswer = answers.find(
        (a) => a.questionId === question._id.toString()
      );

      if (!userAnswer) return;

      if (question.type === "mcq") {
        const isCorrect =
          userAnswer.selectedOption === question.correctAnswer;

        if (isCorrect) score += 1;

        evaluatedAnswers.push({
          questionId: question._id,
          selectedOption: userAnswer.selectedOption,
          isCorrect,
        });
      } else {
        // subjective (manual checking later)
        evaluatedAnswers.push({
          questionId: question._id,
          subjectiveAnswer: userAnswer.subjectiveAnswer,
          isCorrect: false,
        });
      }
    });

    const result = await Result.create({
      student: req.user.id,
      exam: examId,
      answers: evaluatedAnswers,
      score,
      totalMarks: exam.questions.length,
    });

    res.status(201).json({
      message: "Exam submitted successfully",
      score,
      totalMarks: exam.questions.length,
      result,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
