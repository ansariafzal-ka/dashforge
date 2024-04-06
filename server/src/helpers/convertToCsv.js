function csvToJson(csv) {
  const lines = csv.split("\n");
  const result = {};
  const headers = lines[0].split(",");

  // Initialize result object with empty arrays for each header
  headers.forEach((header) => {
    result[header.trim()] = [];
  });

  for (let i = 1; i < lines.length; i++) {
    const currentLine = lines[i].split(",");

    // Skip lines with fewer fields than headers
    if (currentLine.length < headers.length) {
      continue;
    }

    for (let j = 0; j < headers.length; j++) {
      result[headers[j].trim()].push(currentLine[j].trim());
    }
  }

  return result;
}

module.exports = csvToJson;
