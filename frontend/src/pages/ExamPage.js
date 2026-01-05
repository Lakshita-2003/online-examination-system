import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api";

export default function ExamPage() {
  const { id } = useParams(); // examId
  const navigate = useNavigate();

  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  // Fetch exam details
  useEffect(() => {
    API.get(`/exams/${id}`)
      .then((res) => {
        setExam(res.data);
        setTimeLeft(res.data.duration * 60);
      })
      .catch(() => alert("Failed to load exam"));
  }, [id]);

  // Submit exam (memoized)
  const submitExam = useCallback(async () => {
    if (submitted) return;

    try {
      setSubmitted(true);
      const res = await API.post("/results/submit", {
        examId: id,
        answers,
      });

      navigate("/result", { state: res.data });
    } catch (err) {
      alert("Submission failed");
      setSubmitted(false);
    }
  }, [id, answers, navigate, submitted]);

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0 && exam) {
      submitExam();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, submitExam, exam]);

  // Handle answer changes
  const handleAnswer = (questionId, value, type) => {
    setAnswers((prev) => {
      const existing = prev.find((a) => a.questionId === questionId);

      if (existing) {
        return prev.map((a) =>
          a.questionId === questionId
            ? type === "mcq"
              ? { ...a, selectedOption: value }
              : { ...a, subjectiveAnswer: value }
            : a
        );
      }

      return [
        ...prev,
        type === "mcq"
          ? { questionId, selectedOption: value }
          : { questionId, subjectiveAnswer: value },
      ];
    });
  };

  if (!exam) return <h3>Loading exam...</h3>;

  return (
    <div>
      <h2>{exam.title}</h2>

      <h3>
        Time Left: {Math.floor(timeLeft / 60)}:
        {String(timeLeft % 60).padStart(2, "0")}
      </h3>

      {exam.questions.map((q, index) => (
        <div key={q._id} style={{ marginBottom: "20px" }}>
          <p>
            <b>Q{index + 1}.</b> {q.questionText}
          </p>

          {q.type === "mcq" ? (
            q.options.map((opt) => (
              <div key={opt}>
                <input
                  type="radio"
                  name={q._id}
                  onChange={() => handleAnswer(q._id, opt, "mcq")}
                />
                {opt}
              </div>
            ))
          ) : (
            <textarea
              rows="4"
              cols="50"
              placeholder="Write your answer..."
              onChange={(e) =>
                handleAnswer(q._id, e.target.value, "subjective")
              }
            />
          )}
        </div>
      ))}

      <button onClick={submitExam} disabled={submitted}>
        Submit Exam
      </button>
    </div>
  );
}
