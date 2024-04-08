import React, { useState } from "react";

const StatisticsTable = ({ data }) => {
  const keys = Object.keys(data);
  const [selectedOption, setSelectedOption] = useState(keys[0]);

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="p-5">
      <select
        name="select"
        id="select"
        onChange={handleSelectChange}
        className="block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      >
        {keys.map((key) => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </select>
      {selectedOption && (
        <div className="mt-4">
          <div className="overflow-x-auto max-h-[400px] min-w-[500px]">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statistics
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Value
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {Object.entries(data[selectedOption]).map(
                  ([statistic, value]) => (
                    <tr key={statistic}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {statistic}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{value}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatisticsTable;
