import { Routes, Route, useNavigate } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import { useEffect, useState } from "react";
import axios from "axios";
import Main from "./components/Main";
import Dataset from "./components/pages/Dataset";
import Dashboard from "./components/pages/Dashboard";
import Analytics from "./components/pages/Analytics";
import History from "./components/pages/History";
import GenAI from "./components/pages/GenAI";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState("");
  const navigate = useNavigate();

  const checkLoggedIn = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/users/verify-login",
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        console.log(response.data);
        setUserData(response.data);
        setIsLoggedIn(true);
        navigate("/main/dataset");
      }
    } catch (error) {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);

  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      {isLoggedIn && (
        <Route path="/main" element={<Main userData={userData} />}>
          <Route path="dataset" element={<Dataset />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="history" element={<History />} />
          <Route path="gen-ai" element={<GenAI />} />
        </Route>
      )}
    </Routes>
  );
};

export default App;
