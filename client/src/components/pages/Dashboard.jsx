import React, { useState, useEffect } from "react";
import ChartComponent from "../utils/ChartComponent";
import axios from "axios";

const Dashboard = () => {
  const [xData, setxData] = useState("");
  const [yData, setyData] = useState("");

  const [id, setId] = useState(
    localStorage.getItem("datasetId") ? localStorage.getItem("datasetId") : ""
  );

  const fetchXData = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/dataset/data/${id}`,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setxData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchYData = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/dataset/numeric/${id}`,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setyData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id !== "") {
      fetchXData(id);
      fetchYData(id);
    }
  }, [id]);

  return (
    <section className="w-full">
      <div className="max-h-[550px] overflow-auto">
        <div className="p-5 grid grid-cols-2 gap-4 gap-y-6">
          {xData && yData && <ChartComponent xData={xData} yData={yData} />}
          {xData && yData && <ChartComponent xData={xData} yData={yData} />}
          {xData && yData && <ChartComponent xData={xData} yData={yData} />}
          {xData && yData && <ChartComponent xData={xData} yData={yData} />}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
