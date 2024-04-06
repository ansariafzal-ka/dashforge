const extractNonNumericValues = (dataset) => {
  const nonNumericData = {};

  // Iterate over each property (column) in the dataset
  for (const [columnName, values] of Object.entries(dataset)) {
    // Check if any value in the column is non-numeric
    const containsNonNumeric = values.some((value) => isNaN(parseFloat(value)));

    // If the column contains non-numeric values, add it to the result object
    if (containsNonNumeric) {
      nonNumericData[columnName] = values;
    }
  }

  return nonNumericData;
};

module.exports = extractNonNumericValues;
