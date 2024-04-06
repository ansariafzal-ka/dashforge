const Dataset = require("../models/dataset.models");
const User = require("../models/user.models");
const csvToJson = require("../helpers/convertToCsv");
const analyzeData = require("../helpers/analysis");
const statistics = require("../helpers/statistics");
const numeric = require("../helpers/numeric");
const nonNumeric = require("../helpers/nonNumeric");

const datasetControllers = {
  getAllDataset: async (req, res) => {
    try {
      const dataset = await Dataset.find({ user: req.userId });
      res.status(200).json(dataset);
    } catch (error) {
      res.status(500).json({ message: "Dataset not found", error });
    }
  },

  getDataset: async (req, res) => {
    try {
      const { id } = req.params;
      const dataset = await Dataset.find({ user: req.userId, _id: id });
      res.status(200).json(dataset);
    } catch (error) {
      res.status(500).json({ message: "Dataset not found", error });
    }
  },

  getData: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await Dataset.find({ user: req.userId, _id: id });
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

      const csvData = `Name,Age,Gender,Country
      John Doe,30,Male,USA
      Jane Smith,25,Female,Canada
      Michael Johnson,40,Male,UK
      Emily Brown,35,Female,Australia                
      `;

      const jsonData = csvToJson(csvData);

      await Dataset.create({
        user: req.userId,
        dataset: jsonData,
      });

      res.status(201).json({ message: "successful" });
    } catch (error) {
      res.status(500).json({ message: "Error uploading dataset", error });
    }
  },

  getAnalysis: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await Dataset.find({ user: req.userId, _id: id });
      const analysis = analyzeData(data[0].dataset);
      res.send(analysis);
    } catch (error) {
      res.status(500).json({ message: "Error fetching analysis", error });
    }
  },

  getStatistics: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await Dataset.find({ user: req.userId, _id: id });
      const generateStatistics = statistics(data[0].dataset);
      res.send(generateStatistics);
    } catch (error) {
      res.status(500).json({ message: "Error fetching statistics", error });
    }
  },

  getNumeric: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await Dataset.find({ user: req.userId, _id: id });

      const numericData = numeric(data[0].dataset);
      res.json(numericData);
    } catch (error) {
      res.status(500).json({ message: "Error fetching numeric data", error });
    }
  },

  getNonNumeric: async (req, res) => {
    try {
      const { id } = req.params;

      const data = await Dataset.find({ user: req.userId, _id: id });

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
      const dataset = await Dataset.findById(id);
      if (dataset.user.toString() !== req.userId) {
        return res
          .status(403)
          .json({ message: "not authorized to delete this resource" });
      }
      await Dataset.findByIdAndDelete(id);
      res.status(200).json({ message: "Dataset deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "dataset already deleted", error });
    }
  },
};

module.exports = datasetControllers;
