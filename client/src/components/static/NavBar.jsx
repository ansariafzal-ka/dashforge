import React from "react";
import axios from "axios";
import Button from "../utils/Button";

const NavBar = () => {
  const handleLogout = async () => {
    try {
      console.log("in try");
      const response = await axios.post(
        "http://localhost:5000/api/v1/users/logout",
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        alert("logged out");
      }
    } catch (error) {
      alert(error);
    }
  };
  return (
    <nav
      id="home"
      className="bg-white flex justify-between items-center py-4 px-10 border-b sticky top-0"
    >
      <div className="flex items-center gap-1">
        <h1 className="text-xl text-primary font-bold">DashForge</h1>
      </div>
      <Button type="button" title="Logout" onClick={handleLogout} />
      {/* <button onClick={handleLogout}>logout</button> */}
    </nav>
  );
};

export default NavBar;
