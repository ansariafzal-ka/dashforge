import React from "react";
import AnalyticsTable from "../utils/table/AnalyticsTable";
import StatisticsTable from "../utils/table/StatisticsTable";
import { useState, useEffect } from "react";
import axios from "axios";

const Analytics = () => {
  const [analytics, setAnalytics] = useState("");
  const [statistics, setStatistics] = useState("");

  const [id, setId] = useState(
    localStorage.getItem("datasetId") ? localStorage.getItem("datasetId") : ""
  );
  const fetchAnalytics = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/dataset/analysis/${id}`,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setAnalytics(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchStatistics = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/dataset/statistics/${id}`,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setStatistics(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id !== "") {
      fetchAnalytics(id);
      fetchStatistics(id);
    }
  }, [id]);

  return (
    <section>
      <div className="flex flex-row">
        {analytics && <AnalyticsTable data={analytics} />}
        {statistics && <StatisticsTable data={statistics} />}
      </div>
    </section>
  );
};

export default Analytics;
