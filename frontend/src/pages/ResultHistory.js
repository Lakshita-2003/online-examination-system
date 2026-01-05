import { useEffect, useState } from "react";
import API from "../api/api";
import Logout from "../components/Logout";

export default function ResultHistory() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    API.get("/results/my").then((res) => setResults(res.data));
  }, []);

  return (
    <div className="container">
      <Logout />
      <h2>My Results</h2>

      {results.map((r) => (
        <div className="card" key={r._id}>
          <h4>{r.exam.title}</h4>
          <p>
            Score: {r.score} / {r.totalMarks}
          </p>
        </div>
      ))}
    </div>
  );
}
