import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import ProtectedRoute from "./auth/ProtectedRoute";
import ExamPage from "./pages/ExamPage";
import ResultHistory from "./pages/ResultHistory";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student"
          element={
            <ProtectedRoute role="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
      import ExamPage from "./pages/ExamPage";

<Route
  path="/exam/:id"
  element={
    <ProtectedRoute role="student">
      <ExamPage />
    </ProtectedRoute>
  }
/>
<Route
  path="/results"
  element={
    <ProtectedRoute role="student">
      <ResultHistory />
    </ProtectedRoute>
  }
/>


    </BrowserRouter>
  );
}

export default App;
