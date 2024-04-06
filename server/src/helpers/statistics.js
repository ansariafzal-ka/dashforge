function calculateDescriptiveStatistics(data) {
  const columns = Object.keys(data);
  const numericalColumns = columns.filter((column) => {
    return data[column].every((value) => !isNaN(parseFloat(value)));
  });

  const statistics = {};

  numericalColumns.forEach((column) => {
    const values = data[column]
      .map((value) => parseFloat(value))
      .filter((value) => !isNaN(value));
    const sum = values.reduce((acc, val) => acc + val, 0);
    const count = values.length;
    const mean = sum / count;
    const min = Math.min(...values);
    const max = Math.max(...values);

    const squaredDifferences = values.map((value) => Math.pow(value - mean, 2));
    const variance =
      squaredDifferences.reduce((acc, val) => acc + val, 0) / count;
    const stdDeviation = Math.sqrt(variance);

    const median = calculateMedian(values);

    statistics[column] = {
      count: count,
      sum: sum,
      mean: mean,
      min: min,
      max: max,
      median: median,
      variance: variance,
      stdDeviation: stdDeviation,
    };
  });

  return statistics;
}

function calculateMedian(values) {
  const sortedValues = values.slice().sort((a, b) => a - b);
  const middleIndex = Math.floor(sortedValues.length / 2);
  if (sortedValues.length % 2 === 0) {
    return (sortedValues[middleIndex - 1] + sortedValues[middleIndex]) / 2;
  } else {
    return sortedValues[middleIndex];
  }
}

module.exports = calculateDescriptiveStatistics;
