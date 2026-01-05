import { useLocation } from "react-router-dom";

export default function Result() {
  const { state } = useLocation();

  if (!state) return <h3>No result found</h3>;

  return (
    <div>
      <h2>Exam Result</h2>
      <h3>
        Score: {state.score} / {state.totalMarks}
      </h3>
      <p>{state.message}</p>
    </div>
  );
}
