import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const ChartComponent = ({ xData, yData }) => {
  const [selectedXData, setSelectedXData] = useState(
    Object.keys(xData)[0] || ""
  );
  const [selectedYData, setSelectedYData] = useState(
    Object.keys(yData)[0] || ""
  );
  const [chartType, setChartType] = useState("bar");
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const handleXDataChange = (event) => {
    setSelectedXData(event.target.value);
  };

  const handleYDataChange = (event) => {
    setSelectedYData(event.target.value);
  };

  const handleChartTypeChange = (event) => {
    setChartType(event.target.value);
  };

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      const chartData = {
        labels: xData[selectedXData] || [],
        datasets: [
          {
            label: selectedYData,
            data: yData[selectedYData] || [],
            backgroundColor: "rgba(124, 58, 237, 0.8)",
            borderColor: "rgba(124, 58, 237, 1)",
            borderWidth: 1,
          },
        ],
      };

      chartInstance.current = new Chart(ctx, {
        type: chartType,
        data: chartData,
      });
    }
  }, [selectedXData, selectedYData, chartType, xData, yData]);

  return (
    <div className="w-[500px] h-[420px] mx-auto rounded-md border overflow-auto">
      <div className="bg-white px-4 py-2">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label
              htmlFor="xData"
              className="block text-sm font-medium text-gray-700"
            >
              Select X Data:
            </label>
            <select
              id="xData"
              value={selectedXData}
              onChange={handleXDataChange}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              {Object.keys(xData).map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="yData"
              className="block text-sm font-medium text-gray-700"
            >
              Select Y Data:
            </label>
            <select
              id="yData"
              value={selectedYData}
              onChange={handleYDataChange}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              {Object.keys(yData).map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="chartType"
            className="block text-sm font-medium text-gray-700"
          >
            Select Chart Type:
          </label>
          <select
            id="chartType"
            value={chartType}
            onChange={handleChartTypeChange}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            {["bar", "line", "scatter", "pie", "radar"].map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="bg-white px-4 py-2 rounded-b-md">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default ChartComponent;
