const Dataset = require("../models/dataset.models");
const User = require("../models/user.models");
const csvToJson = require("../helpers/convertToCsv");
const analyzeData = require("../helpers/analysis");
const statistics = require("../helpers/statistics");
const numeric = require("../helpers/numeric");
const nonNumeric = require("../helpers/nonNumeric");

const datasetControllers = {
  getDataset: async (req, res) => {
    try {
      const dataset = await Dataset.find();
      res.status(200).json(dataset);
    } catch (error) {
      res.status(500).json({ message: "Dataset not found", error });
    }
  },

  getData: async (req, res) => {
    try {
      const data = await Dataset.find();
      res.status(200).json(data[0].dataset);
    } catch (error) {
      res.status(500).json({ message: "Dataset not found", error });
    }
  },

  postDataset: async (req, res) => {
    try {
      if (!req.file) {
        res.status(400).json({ message: "Cannont find a csv file!" });
      }

      const csvData = `Name,Age,Country,Gender,Occupation,Income,Education,Height,Weight,Experience
      John,35,USA,Male,Engineer,75000,Bachelor's,175,75.5,8
      Jane,28,UK,Female,Doctor,85000,Master's,163,60.3,6
      Alex,40,Canada,Male,Teacher,55000,Bachelor's,180,80.1,10
      Emily,32,Germany,Female,Software Developer,65000,PhD,168,65.2,7
      Michael,45,France,Male,Accountant,70000,Bachelor's,172,70.9,9
      Sophia,30,Italy,Female,Marketing Manager,90000,Master's,170,68.7,5
      Matthew,37,Spain,Male,Lawyer,80000,Bachelor's,178,77.4,12
      Olivia,29,Japan,Female,Graphic Designer,60000,Bachelor's,165,62.8,8
      William,33,Australia,Male,Architect,72000,Master's,183,82.6,11
      Isabella,31,China,Female,Research Scientist,68000,PhD,175,78.2,9      
      `;

      const jsonData = csvToJson(csvData);

      await Dataset.create({
        dataset: jsonData,
      });

      res.status(201).json({ message: "successful" });
    } catch (error) {
      res.status(500).json({ message: "Error uploading dataset", error });
    }
  },

  getAnalysis: async (req, res) => {
    try {
      const data = await Dataset.find();
      const analysis = analyzeData(data[0].dataset);
      res.send(analysis);
    } catch (error) {
      res.status(500).json({ message: "Error fetching analysis", error });
    }
  },

  getStatistics: async (req, res) => {
    try {
      const data = await Dataset.find();
      const generateStatistics = statistics(data[0].dataset);
      res.send(generateStatistics);
    } catch (error) {
      res.status(500).json({ message: "Error fetching statistics", error });
    }
  },

  getNumeric: async (req, res) => {
    try {
      const data = await Dataset.find();

      const numericData = numeric(data[0].dataset);
      res.json(numericData);
    } catch (error) {
      res.status(500).json({ message: "Error fetching numeric data", error });
    }
  },

  getNonNumeric: async (req, res) => {
    try {
      const data = await Dataset.find();

      const nonNumericData = nonNumeric(data[0].dataset);
      res.json(nonNumericData);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching non numeric data", error });
    }
  },

  deleteDataset: async (req, res) => {
    try {
      const { id } = req.params;
      await Dataset.findByIdAndDelete(id);
      res.status(200).json({ message: "Dataset deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error fetching analysis", error });
    }
  },
};

module.exports = datasetControllers;
