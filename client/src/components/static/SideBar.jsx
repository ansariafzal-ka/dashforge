import React, { useState } from "react";
import { MdDataset, MdDashboard } from "react-icons/md";
import { IoMdAnalytics } from "react-icons/io";
import { FaRobot, FaHistory } from "react-icons/fa";
import { Link } from "react-router-dom";

const SideBar = () => {
  const [activeLink, setActiveLink] = useState(0);

  const sideBarLink = [
    {
      title: "Dataset",
      icon: <MdDataset />,
      link: "/main/dataset",
    },
    {
      title: "Dashboard",
      icon: <MdDashboard />,
      link: "/main/dashboard",
    },
    {
      title: "Analytics",
      icon: <IoMdAnalytics />,
      link: "/main/analytics",
    },
    {
      title: "History",
      icon: <FaHistory />,
      link: "/main/history",
    },
    {
      title: "Generative AI",
      icon: <FaRobot />,
      link: "/main/gen-ai",
    },
  ];

  const handleSetActiveLink = (index) => {
    setActiveLink(index);
  };

  return (
    <div className="min-w-[250px] h-full bg-white border-r">
      <ul className="p-4 flex flex-col gap-y-2">
        {sideBarLink.map((val, key) => {
          return (
            <li key={key}>
              <Link
                to={val.link}
                className={`cursor-pointer flex items-center gap-1 font-medium p-2 rounded hover:bg-violet-600 hover:text-white duration-75 ${
                  activeLink === key ? "bg-violet-600 text-white" : ""
                }`}
                onClick={() => handleSetActiveLink(key)}
              >
                <div>{val.icon}</div>
                <div>{val.title}</div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SideBar;
