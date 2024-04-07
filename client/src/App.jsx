import { Routes, Route, Outlet, useNavigate } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import { useEffect, useState } from "react";
import axios from "axios";
import Main from "./components/Main";
import Dataset from "./components/dynamic/Dataset";
import Dashboard from "./components/dynamic/Dashboard";
import Analytics from "./components/dynamic/Analytics";
import History from "./components/dynamic/History";
import GenAI from "./components/dynamic/GenAI";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const checkLoggedIn = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/users/verify-login",
        {
          withCredentials: true,
        }
      );
      console.log(response);
      if (response.status === 200) {
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

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/main" element={<Main />}>
        <Route path="dataset" element={<Dataset />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="history" element={<History />} />
        <Route path="gen-ai" element={<GenAI />} />
      </Route>
      {isLoggedIn ? <Route path="/main" element={<Main />} /> : null}
    </Routes>
  );
};

export default App;
