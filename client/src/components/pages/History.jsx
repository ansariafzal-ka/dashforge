import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const History = () => {
  const [data, setData] = useState([]);

  const fetchDatasets = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/dataset/",
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setData(response.data);
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDatasets();
  }, []);

  return (
    <section className="p-5">
      <div className="flex justify-center items-center bg-white border-b p-5 gap-4 rounded">
        {data &&
          data.map((item, key) => (
            <div
              key={key}
              onClick={() => {
                localStorage.setItem("datasetId", item._id);
                window.location.reload();
              }}
              className="border rounded-lg p-4 cursor-pointer hover:bg-gray-100 duration-75"
            >
              <h1 className="text-lg font-semibold">{item.filename}</h1>
              <h1 className="text-gray-500">
                created at: {new Date(item.createdAt).toLocaleDateString()}
              </h1>
            </div>
          ))}
      </div>
    </section>
  );
};

export default History;
