import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./components/utils/PrivateRoutes";
import Dashboard from "./components/pages/Dashboard";
import Dataset from "./components/pages/Dataset";
import Login from "./components/Login";
import Main from "./components/Main";
import Analytics from "./components/pages/Analytics";
import GenAI from "./components/pages/GenAI";

function TestApp() {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route path="/main" element={<Main />}>
          <Route path="dataset" element={<Dataset />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="history" element={<History />} />
          <Route path="gen-ai" element={<GenAI />} />
        </Route>
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default TestApp;
