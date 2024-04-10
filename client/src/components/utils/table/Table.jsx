import React from "react";

const Table = ({ data }) => {
  if (!data || Object.keys(data).length === 0) {
    return <div>No data available</div>;
  }

  const keys = Object.keys(data);

  return (
    <div className="w-full border divide-y divide-gray-200">
      <table className="w-full">
        <thead className="bg-gray-50 divide-y divide-gray-200">
          <tr>
            {keys.map((key) => (
              <th
                key={key}
                className="px-4 py-2 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider whitespace-no-wrap border-r border-l"
              >
                {key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data[keys[0]].map((_, index) => (
            <tr key={index}>
              {keys.map((key) => (
                <td key={key} className="px-4 py-2 whitespace-no-wrap border">
                  {data[key][index]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
