import React from "react";

const Button = ({ title, type, onClick }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="mt-2 text-white font-medium bg-violet-600 p-1 rounded"
    >
      {title}
    </button>
  );
};

export default Button;
