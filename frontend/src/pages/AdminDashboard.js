import { useEffect, useState } from "react";
import API from "../api/api";
import Logout from "../components/Logout";

export default function AdminDashboard() {
  const [exams, setExams] = useState([]);
  const [question, setQuestion] = useState({
    examId: "",
    questionText: "",
    type: "mcq",
    options: "",
    correctAnswer: "",
  });

  useEffect(() => {
    API.get("/exams").then((res) => setExams(res.data));
  }, []);

  const addQuestion = async () => {
    await API.post(`/exams/${question.examId}/questions`, {
      questionText: question.questionText,
      type: question.type,
      options: question.type === "mcq" ? question.options.split(",") : [],
      correctAnswer: question.correctAnswer,
    });

    alert("Question added");
  };

  return (
    <div className="container">
      <Logout />
      <h2>Admin Dashboard</h2>

      <select onChange={(e) => setQuestion({ ...question, examId: e.target.value })}>
        <option value="">Select Exam</option>
        {exams.map((e) => (
          <option key={e._id} value={e._id}>
            {e.title}
          </option>
        ))}
      </select>

      <input
        placeholder="Question"
        onChange={(e) => setQuestion({ ...question, questionText: e.target.value })}
      />

      <select onChange={(e) => setQuestion({ ...question, type: e.target.value })}>
        <option value="mcq">MCQ</option>
        <option value="subjective">Subjective</option>
      </select>

      {question.type === "mcq" && (
        <>
          <input
            placeholder="Options (comma separated)"
            onChange={(e) => setQuestion({ ...question, options: e.target.value })}
          />
          <input
            placeholder="Correct Answer"
            onChange={(e) => setQuestion({ ...question, correctAnswer: e.target.value })}
          />
        </>
      )}

      <button onClick={addQuestion}>Add Question</button>
    </div>
  );
}
