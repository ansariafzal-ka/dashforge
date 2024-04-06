const extractNumericValues = (dataset) => {
  const numericData = {};

  // Iterate over each property (column) in the dataset
  for (const [columnName, values] of Object.entries(dataset)) {
    // Convert each value to a numeric type and filter out non-numeric values
    const numericValues = values
      .map((value) => parseFloat(value))
      .filter((value) => !isNaN(value));

    // Only add the column with numeric values to the result object if it's not empty
    if (numericValues.length > 0) {
      numericData[columnName] = numericValues;
    }
  }

  return numericData;
};

module.exports = extractNumericValues;
