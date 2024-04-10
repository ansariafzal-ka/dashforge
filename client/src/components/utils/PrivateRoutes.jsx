import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";

const PrivateRoutes = () => {
  const [auth, setAuth] = useState(true);

  const isAuthenticated = async () => {
    try {
      console.log("in try");
      const response = await axios.get(
        "http://localhost:5000/api/v1/users/verify-login",
        {
          withCredentials: true,
        }
      );
      console.log("status", response.status);
      if (response.status === 200) {
        setAuth(true);
        console.log("Auth in if : ", auth);
      }
    } catch (error) {
      setAuth(false);
    }
  };

  useEffect(() => {
    isAuthenticated();
    console.log("is Auth? : ", auth);
  }, [auth]);

  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
