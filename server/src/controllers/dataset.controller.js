const fs = require("fs");
const Dataset = require("../models/dataset.models");
const csvToJson = require("../helpers/convertToCsv");
const analyzeData = require("../helpers/analysis");
const statistics = require("../helpers/statistics");
const numeric = require("../helpers/numeric");
const nonNumeric = require("../helpers/nonNumeric");
const genAI = require("../helpers/genAI");

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

      const csvData = fs.readFileSync(
        `C:/Users/Admin/Desktop/Github Repos/dashforge/server/uploads/${req.file.filename}`,
        "utf-8"
      );

      const jsonData = csvToJson(csvData);

      const dataset = await Dataset.create({
        user: req.userId,
        filename: req.file.filename,
        dataset: jsonData,
      });

      res.status(201).json({ message: "Dataset uploaded", id: dataset._id });
    } catch (error) {
      res.status(500).json({ message: "Error uploading dataset", error });
    }
  },

  getAnalysis: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await Dataset.find({ user: req.userId, _id: id });
      const analysis = analyzeData(data[0].dataset);
      res.json(analysis);
    } catch (error) {
      res.status(500).json({ message: "Error fetching analysis", error });
    }
  },

  getStatistics: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await Dataset.find({ user: req.userId, _id: id });
      const generateStatistics = statistics(data[0].dataset);
      res.json(generateStatistics);
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

  getSummary: async (req, res) => {
    try {
      const { id } = req.params;
      const prompt = req.body.prompt;

      const data = await Dataset.findById({ user: req.userId, _id: id });
      const custom_prompt =
        prompt +
        JSON.stringify(data.dataset) +
        "and could you kindly provide a thorough and detailed response, avoiding the use of tabular format?";

      const aiRes = await genAI(custom_prompt);

      res.status(200).json({ response: aiRes });
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  },
};

module.exports = datasetControllers;
