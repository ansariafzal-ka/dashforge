import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import Button from "./utils/Button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/users/login",
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setEmail("");
        setPassword("");
        navigate("/main");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <section className="w-full h-screen bg-gray-100 flex justify-center items-center">
      <div className="flex flex-col bg-white items-center p-4 w-[400px] rounded gap-y-4">
        <h1 className="text-2xl font-medium">Login</h1>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col justify-center gap-y-2"
        >
          <label htmlFor="email" className="font-medium">
            Email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            id="email"
            required
            className="border px-2 py-1 rounded outline-none"
          />
          <label htmlFor="password" className="font-medium">
            Password
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            id="password"
            required
            className="border px-2 py-1 rounded outline-none"
          />
          <Button type="submit" title="login" />
        </form>
        <p>
          Don't have an account?
          <a href="/register" className="ml-1 text-blue-500 underline">
            register
          </a>
        </p>
      </div>
    </section>
  );
};

export default Login;
