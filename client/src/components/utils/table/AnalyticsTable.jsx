import React, { useState } from "react";

const AnalyticsTable = ({ data }) => {
  const defaultOption = Object.keys(data.missingValues)[0];
  const [selectedOption, setSelectedOption] = useState(defaultOption);

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const options = Object.keys(data.valueFrequency[selectedOption] || {});

  return (
    <div className="p-5">
      <select
        name="select"
        id="select"
        onChange={handleSelectChange}
        className="block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        {Object.keys(data.missingValues).map((key) => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </select>
      {selectedOption && (
        <div className="mt-4">
          <div className="overflow-auto max-h-[400px] min-w-[500px]">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Analysis
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Value
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    Missing Values
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {data.missingValues[selectedOption]}
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">Unique Values</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {data.uniqueValues[selectedOption]}
                  </td>
                </tr>
                {options.map((option) => (
                  <tr key={option}>
                    <td className="px-6 py-4 whitespace-nowrap">{option}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {data.valueFrequency[selectedOption][option]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h1 className="text-gray-500 mt-4">
            cols X rows ({data.columns} X {data.rows})
          </h1>
        </div>
      )}
    </div>
  );
};

export default AnalyticsTable;
