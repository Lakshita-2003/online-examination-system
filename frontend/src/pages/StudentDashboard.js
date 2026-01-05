import { useEffect, useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import Logout from "../components/Logout";

export default function StudentDashboard() {
  const [exams, setExams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/exams").then((res) => setExams(res.data));
  }, []);

  return (
    <div>
      <h2>Available Exams</h2>
      {exams.map((exam) => (
        <div key={exam._id}>
          <h4>{exam.title}</h4>
          <p>Duration: {exam.duration} mins</p>
          <button onClick={() => navigate(`/exam/${exam._id}`)}>
            Start Exam
          </button>
        </div>
      ))}
      <Logout />

    </div>
  );
}
