function analyzeData(data) {
  const columns = Object.keys(data);
  const numRows = data[columns[0]].length;
  const missingValues = {};
  const uniqueValues = {};
  const valueFrequency = {};

  columns.forEach((column) => {
    let missingCount = 0;
    let uniqueSet = new Set();
    let frequency = {};
    data[column].forEach((value) => {
      if (value.trim() === "") {
        missingCount++;
      } else {
        uniqueSet.add(value);
        frequency[value] = (frequency[value] || 0) + 1;
      }
    });
    missingValues[column] = missingCount;
    uniqueValues[column] = uniqueSet.size;
    valueFrequency[column] = frequency;
  });

  return {
    columns: columns.length,
    rows: numRows,
    missingValues: missingValues,
    uniqueValues: uniqueValues,
    valueFrequency: valueFrequency,
  };
}

module.exports = analyzeData;
